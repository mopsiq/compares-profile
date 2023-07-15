import { FastifyReply, FastifyRequest } from "fastify";
import { PlayerService } from "../services/steam/Player.js";
import { InventoryService } from "../services/steam/Inventory.js";
import { BadgesService } from "../services/steam/Badges.js";

export class SteamController {
  req;
  res;

  constructor(req: FastifyRequest, res: FastifyReply) {
    this.req = req;
    this.res = res;
  }

  playerAchievements() {
    const Player = new PlayerService(this.req.query.steamid);

    return Player.achievements();
  }

  getInventory = () => {
    const Inventory = new InventoryService(this.req.query.steamid);

    return Inventory.stats(this.req.query.appid);
  };

  getBadgesStats = () => {
    const Badges = new BadgesService(this.req.query.steamid);

    return Badges.stats();
  };

  getBadgesProgress = () => {
    const Badges = new BadgesService(this.req.query.steamid);

    return Badges.progress(this.req.query.badgeId);
  };
}
