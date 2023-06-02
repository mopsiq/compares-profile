import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import fs from "fs";
import dotenv from "dotenv";
import { SteamGlobalAchievementsDTO } from "../../../src/types/api/dto/SteamGlobalAchievementsDTO";
import { SteamRecentlyGamesDTO } from "../../../src/types/api/dto/SteamRecentlyGamesDTO";
import { httpsRequest } from "../../utils/httpsRequest";
import { streamToString } from "../../utils/streamToString";
import { Promise } from "bluebird";
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

    return Promise.all([
      httpsRequest({
        ...defaultHttpsOptions,
        path: `/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&format=json`,
      }),
    ])
      .spread(async (ownedGamesStream) => {
        const ownedGames: SteamRecentlyGamesDTO = await streamToString(
          ownedGamesStream,
        );

        return ownedGames;
      })
      .then((ownedGames) => {
        const appIds = ownedGames.response.games.map((i) => i.appid);

        return Promise.map(appIds, async (appId) => {
          // TODO: Check needs request in /GetGlobalAchievementPercentagesForApp
          // return httpsRequest({
          //   ...defaultHttpsOptions,
          //   path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appId}&format=json`,
          // }).then(async (achievementsByAppStream) => {
          //   const achievementsByApp = await streamToString(
          //     achievementsByAppStream,
          //   );
          // });
        });
      });
  });

  // app.get("/playerAchievementsApp:?appid&key&steamid", async (req, res) => {
  //   const { appid, key, steamid } = req.query;

  //   const list = await httpsRequest(
  //     {
  //       ...defaultHttpsOptions,
  //       path: `/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&format=json`,
  //     },
  //     async (ownedGames) => await streamToString(ownedGames),
  //   );

  //   res.send(list);
  // });

  // app.get("/globalAchievementsApp:?gameid", async (req, res) => {
  //   const { gameId } = req.query;

  //   const achievements = await httpsRequest(
  //     {
  //       ...defaultHttpsOptions,
  //       path: `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${gameId}&format=json`,
  //     },
  //     async (globalAchievements) => await streamToString(globalAchievements),
  //   );

  //   res.send(achievements);
  // });

  done();
};
