import { FastifyReply, FastifyRequest } from "fastify";
import Promise from "bluebird";
import { SteamUserInventoryDTO } from "../../types/SteamUserInventoryDTO.js";
import { httpsRequest } from "../../utils/httpsRequest.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { PROXY_SERVER } from "../../constants/PROXY_SERVER.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";
import { removeCurrencyUnit } from "../../utils/removeCurrencyUnit.js";

export class InventoryService {
  constructor() {}

  async stats(req: FastifyRequest, res: FastifyReply) {
    const { steamid, appid } = req.query;

    return httpsRequest({
      ...steamRequestSettings,
      host: "steamcommunity.com",
      path: `/inventory/${steamid}/${appid}/2?l=english&count=5000&format=json`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((inventory) => {
      if (!inventory) {
        return inventory;
      }

      const inventoryParse: SteamUserInventoryDTO = JSON.parse(inventory);

      if (inventoryParse === null) {
        return inventoryParse;
      }

      const marketableItems =
        inventoryParse.descriptions.filter((item) => item?.marketable === 1) ||
        [];

      const marketableItemsCount =
        inventoryParse.descriptions.filter((item) => item?.marketable === 1)
          .length || 0;

      const tradableItemsCount =
        inventoryParse.descriptions.filter((item) => item?.tradable === 1)
          .length || 0;

      return Promise.map(marketableItems, (item) => {
        return httpsRequest({
          ...steamRequestSettings,
          host: "steamcommunity.com",
          path: `/market/priceoverview/?appid=${730}&currency=0&market_hash_name=${encodeURI(
            item.market_hash_name,
          )}`,
          agent: new HttpsProxyAgent(PROXY_SERVER),
        }).then((response) => JSON.parse(response));
      })
        .then((itemsPrice) => {
          const prices = itemsPrice.map((i) => {
            if (i === null || !i?.success) {
              return 0;
            }

            return parseFloat(removeCurrencyUnit("$", i?.lowest_price));
          });

          return {
            max: Math.max(...prices),
            min: Math.min(...prices),
          };
        })
        .then((prices) => ({
          ...prices,
          ...inventoryParse,
          marketableItemsCount,
          tradableItemsCount,
        }));
    });
  }
}
