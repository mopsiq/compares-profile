import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { SteamController } from "../../controllers/steamController.js";

export const steamRouter = (
  app: FastifyInstance,
  opt: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  app.get("/playerAchievementsApp:?steamid", async (req, res) => {
    return new SteamController(req, res).playerAchievements();
  });

  app.get("/getInventory:?steamid&appid", async (req, res) => {
    return new SteamController(req, res).getInventory();
  });

  app.get("/getBadges:?steamid", async (req, res) => {
    return new SteamController(req, res).getBadgesStats();
  });

  app.get("/getBadgesProgress:?steamid&badgeId", async (req, res) => {
    return new SteamController(req, res).getBadgesProgress();
  });

  done();
};
