import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import proxy from "@fastify/http-proxy";

export const steamProxy = (
  app: FastifyInstance,
  opt: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  app.register(proxy, {
    upstream: "https://api.steampowered.com/ISteamUser/GetFriendList/v0001",
    prefix: "/api/steam/friendList",
  });
  app.register(proxy, {
    upstream:
      "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002",
    prefix: "/api/steam/playerSummaries",
  });

  app.register(proxy, {
    upstream: "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001",
    prefix: "/api/steam/ownedGames",
  });

  app.register(proxy, {
    upstream:
      "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001",
    prefix: "/api/steam/recentlyGames",
  });

  app.register(proxy, {
    upstream: "https://api.steampowered.com/IPlayerService/GetBadges/v1/",
    prefix: "/api/steam/badges",
  });

  done();
};
