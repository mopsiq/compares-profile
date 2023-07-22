import { STEAM_API_USER_KEY } from "../../constants/STEAM_API_USER_KEY.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";
import { HttpsInstance } from "../../core/Https.js";

export class SystemService {
  constructor() {}

  async resolveVanityUrl(vanityurl: string) {
    return HttpsInstance.makeRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_API_USER_KEY}&vanityurl=${vanityurl}`,
    }).then((vanityUrl) => JSON.parse(vanityUrl));
  }
}
