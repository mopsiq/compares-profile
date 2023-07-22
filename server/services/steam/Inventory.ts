import Promise from "bluebird";
import { SteamUserInventoryDTO } from "../../types/SteamUserInventoryDTO.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";
import { removeCurrencyUnit } from "../../utils/removeCurrencyUnit.js";
import { HttpsInstance } from "../../core/Https.js";

export class InventoryService {
  private steamid;

  constructor(steamid: string) {
    this.steamid = steamid;
  }

  async stats(appid: number) {
    return HttpsInstance.makeRequest({
      ...steamRequestSettings,
      host: "steamcommunity.com",
      path: `/inventory/${this.steamid}/${appid}/2?l=english&count=5000&format=json`,
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

      return Promise.mapSeries(marketableItems, async (item) => {
        return HttpsInstance.makeRequest({
          ...steamRequestSettings,
          host: "steamcommunity.com",
          path: `/market/priceoverview/?appid=${appid}&currency=0&market_hash_name=${encodeURI(
            item.market_hash_name,
          )}`,
          endpointDelay: 1 * 60 * 1000,
        }).then((response) => ({
          price: JSON.parse(response),
          market_name: item.market_name,
          icon: item.icon_url,
        }));
      })
        .then((items) => {
          const prices = items
            .filter((i) => {
              return (
                (i !== undefined || i !== 0) &&
                i.price?.success &&
                i.price?.lowest_price
              );
            })
            .map((i) => {
              console.log("price", i.price?.lowest_price);

              return {
                ...i,
                price: parseFloat(
                  removeCurrencyUnit("$", i.price?.lowest_price),
                ),
              };
            });

          return {
            max: prices.sort((a, b) => b.price - a.price)[0],
            min: prices.sort((a, b) => a.price - b.price)[0],
            total: prices.reduce((acc, i) => (acc += i.price), 0),
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
