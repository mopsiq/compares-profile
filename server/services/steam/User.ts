import { httpsRequest } from "../../utils/httpsRequest.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { STEAM_API_USER_KEY } from "../../constants/STEAM_API_USER_KEY.js";
import { PROXY_SERVER } from "../../constants/PROXY_SERVER.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";

export class UserService {
  steamid: string;

  constructor(steamid: string) {
    this.steamid = steamid;
  }

  async friends() {
    return httpsRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/ISteamUser/GetFriendList/v1/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((friendsList) => {
      const friendsListParse = JSON.parse(friendsList);

      if (Object.values(friendsListParse).length === 0) {
        return {
          message: "Friend list is empty",
        };
      }

      return friendsListParse;
    });
  }

  async groups() {
    return httpsRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/ISteamUser/GetUserGroupList/v1/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((groupList) => {
      const groupListParse = JSON.parse(groupList);

      if (Object.values(groupListParse).length === 0) {
        return {
          message: "Group list is empty",
        };
      }

      return groupListParse;
    });
  }

  async bans() {
    return httpsRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/ISteamUser/GetPlayerBans/v1/?key=${STEAM_API_USER_KEY}&steamids=${this.steamid}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((ban) => JSON.parse(ban));
  }
}
