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
    const Player = new PlayerService();

    return Player.achievements(this.req, this.res);
  }

  getInventory = () => {
    const Inventory = new InventoryService();

    return Inventory.stats(this.req, this.res);
  };

  getBadgesStats = () => {
    const Badges = new BadgesService();

    return Badges.stats(this.req, this.res);
  };

  getBadgesProgress = () => {
    const Badges = new BadgesService();

    return Badges.progress(this.req, this.res);
  };
}
