import { FastifyReply, FastifyRequest } from "fastify";
import Promise from "bluebird";
import { SteamRecentlyGamesDTO } from "../../../src/types/api/dto/SteamRecentlyGamesDTO.js";
import { httpsRequest } from "../../utils/httpsRequest.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { STEAM_API_USER_KEY } from "../../constants/STEAM_API_USER_KEY.js";
import { PROXY_SERVER } from "../../constants/PROXY_SERVER.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";

export class PlayerService {
  constructor() {}

  async achievements(req: FastifyRequest, res: FastifyReply) {
    const { key, steamid } = req.query;

    return httpsRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&format=json`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((ownedGames) => {
      const ownedParseGames = JSON.parse(ownedGames) as SteamRecentlyGamesDTO;
      const appIds = ownedParseGames.response.games.map((i) => i.appid);

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
            path: `/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${STEAM_API_USER_KEY}&steamid=${steamid}`,
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
}
