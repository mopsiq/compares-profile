import { httpsRequest } from "../../utils/httpsRequest.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { STEAM_API_USER_KEY } from "../../constants/STEAM_API_USER_KEY.js";
import { PROXY_SERVER } from "../../constants/PROXY_SERVER.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";

export class SystemService {
  constructor() {}

  async resolveVanityUrl(vanityurl: string) {
    return httpsRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_API_USER_KEY}&vanityurl=${vanityurl}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((vanityUrl) => JSON.parse(vanityUrl));
  }
}
