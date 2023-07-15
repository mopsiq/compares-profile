import Promise from "bluebird";
import { SteamRecentlyGamesDTO } from "../../../src/types/api/dto/SteamRecentlyGamesDTO.js";
import { httpsRequest } from "../../utils/httpsRequest.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { STEAM_API_USER_KEY } from "../../constants/STEAM_API_USER_KEY.js";
import { PROXY_SERVER } from "../../constants/PROXY_SERVER.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";

export class PlayerService {
  steamid: string;

  constructor(steamid: string) {
    this.steamid = steamid;
  }

  async ownedGames() {
    return httpsRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((ownedGames) => JSON.parse(ownedGames));
  }

  async recentlyGames() {
    return httpsRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((recentlyGames) => JSON.parse(recentlyGames));
  }

  async achievements() {
    return this.ownedGames().then(async (ownedGames: SteamRecentlyGamesDTO) => {
      const appIds = ownedGames.response.games.map((i) => i.appid);

      return Promise.map(appIds, async (appId) => {
        return Promise.all([
          httpsRequest({
            ...steamRequestSettings,
            method: "GET",
            path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appId}&format=json`,
          }),
          httpsRequest({
            ...steamRequestSettings,
            method: "GET",
            path: `/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
          }),
        ]).then(async ([globalAchievements, userStats]) => {
          return {
            globalAchievements: JSON.parse(globalAchievements),
            userStats: JSON.parse(userStats),
          };
        });
      }).then((stats) => {
        return stats.map((s) => ({
          globalAchievements: {
            achievements:
              s.globalAchievements.achievementpercentages?.achievements || [],
            achievementsCount:
              s.globalAchievements.achievementpercentages?.achievements
                .length || 0,
          },
          userStats: {
            playerStats: {
              ...s.userStats.playerstats,
              completedAchievements:
                s.userStats.playerstats?.achievements?.length || 0,
            },
          },
        }));
      });
    });
  }

  async summaries() {
    return httpsRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((summariesInfo) => JSON.parse(summariesInfo));
  }
}
