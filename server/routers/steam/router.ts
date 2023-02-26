import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";

export const steamRouter = (
  app: FastifyInstance,
  opt: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  app.get("/playerAchievementsApp:?appid&key&steamid", (req, res) => {
    console.log(req.query);
    res.send("hello");
  });
  app.get("/globalAchievementsApp:?gameid", (req, res) => {
    res.send("hello");
  });

  done();
};
