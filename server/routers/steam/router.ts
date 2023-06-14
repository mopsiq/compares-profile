import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import fs from "fs";
import dotenv from "dotenv";
import { Promise } from "bluebird";
import { SteamRecentlyGamesDTO } from "../../../src/types/api/dto/SteamRecentlyGamesDTO";
import { httpsRequest } from "../../utils/httpsRequest";
import { streamToString } from "../../utils/streamToString";
dotenv.config();

const defaultHttpsOptions = {
  key: fs.readFileSync(process.env.PEM_KEY as string, "utf-8"),
  cert: fs.readFileSync(process.env.CRT_KEY as string, "utf-8"),
  host: "api.steampowered.com",
  method: "GET",
};

export const steamRouter = (
  app: FastifyInstance,
  opt: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  app.get("/playerAchievementsApp:?key&steamid", async (req, res) => {
    const { key, steamid } = req.query;

    return httpsRequest({
      ...defaultHttpsOptions,
      path: `/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&format=json`,
    })
      .then((ownedGames) => streamToString(ownedGames))
      .then((ownedGames) => {
        const ownedParseGames = JSON.parse(ownedGames) as SteamRecentlyGamesDTO;
        const appIds = ownedParseGames.response.games.map((i) => i.appid);

        return Promise.map(appIds, async (appId) => {
          return Promise.all([
            httpsRequest({
              ...defaultHttpsOptions,
              path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appId}&format=json`,
            }),
            httpsRequest({
              ...defaultHttpsOptions,
              path: `/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamid=${steamid}`,
            }),
          ]).then(async ([globalAchievementsStream, userStatsStream]) => {
            const globalAchievementsParse = await streamToString(
              globalAchievementsStream,
            );
            const globalAchievements = JSON.parse(globalAchievementsParse);

            const userStatsParse = await streamToString(userStatsStream);
            const userStats = JSON.parse(userStatsParse);

            return {
              globalAchievements,
              userStats,
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
  });

  done();
};
