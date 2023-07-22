import Promise from "bluebird";
import { SteamRecentlyGamesDTO } from "../../../src/types/api/dto/SteamRecentlyGamesDTO.js";
import { STEAM_API_USER_KEY } from "../../constants/STEAM_API_USER_KEY.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";
import { HttpsInstance } from "../../core/Https.js";

export class PlayerService {
  steamid: string;

  constructor(steamid: string) {
    this.steamid = steamid;
  }

  async ownedGames() {
    return HttpsInstance.makeRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
    }).then((ownedGames) => JSON.parse(ownedGames));
  }

  async recentlyGames() {
    return HttpsInstance.makeRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
    }).then((recentlyGames) => JSON.parse(recentlyGames));
  }

  async achievements() {
    const ids = [730, 730, 730, 730];
    return Promise.map(
      ids,
      async (id) => {
        return HttpsInstance.makeRequest({
          ...steamRequestSettings,
          method: "GET",
          path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${730}&format=json`,
        }).then(() => {
          return HttpsInstance.makeRequest({
            ...steamRequestSettings,
            method: "GET",
            path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${730}&format=json`,
          });
        });
      },
      { concurrency: 1 },
    );

    return Promise.all(
      Promise.map(
        ids,
        async (id) => {
          return HttpsInstance.makeRequest({
            ...steamRequestSettings,
            method: "GET",
            path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${730}&format=json`,
          }).then(() => {
            return HttpsInstance.makeRequest({
              ...steamRequestSettings,
              method: "GET",
              path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${730}&format=json`,
            });
          });
        },
        { concurrency: 1 },
      ),
    );

    return this.ownedGames().then(async (ownedGames: SteamRecentlyGamesDTO) => {
      const appIds = ownedGames.response.games.map((i) => i.appid);

      return Promise.map(testAppIds, async (appId) => {
        return Promise.all([
          await HttpsInstance.makeRequest({
            ...steamRequestSettings,
            method: "GET",
            path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appId}&format=json`,
          }),
          await HttpsInstance.makeRequest({
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
    return HttpsInstance.makeRequest({
      ...steamRequestSettings,
      method: "GET",
      path: `/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
    }).then((summariesInfo) => JSON.parse(summariesInfo));
  }
}
