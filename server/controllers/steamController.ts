import { FastifyReply, FastifyRequest } from "fastify";
import { PlayerService } from "../services/steam/Player.js";
import { InventoryService } from "../services/steam/Inventory.js";
import { BadgesService } from "../services/steam/Badges.js";
import { UserService } from "../services/steam/User.js";
import { SystemService } from "../services/steam/System.js";

export class SteamController {
  req;
  res;

  constructor(req: FastifyRequest, res: FastifyReply) {
    this.req = req;
    this.res = res;
  }

  resolveVanityUrl() {
    const link = this.req.query.link.replace(/\/$/g, "");
    const regExpAllDigit = /^\d+$/;
    const regExpProfileName = /[^\/]+$/;
    const profileName = link.match(regExpProfileName) as RegExpMatchArray;

    if (regExpAllDigit.test(profileName[0])) {
      return { steamid: profileName[0] };
    } else {
      return new SystemService().resolveVanityUrl(profileName[0]);
    }
  }

  playerAchievements() {
    const Player = new PlayerService(this.req.query.steamid);

    return Player.achievements();
  }

  playerSummaries() {
    const Player = new PlayerService(this.req.query.steamid);

    return Player.summaries();
  }

  ownedGames() {
    const Player = new PlayerService(this.req.query.steamid);

    return Player.ownedGames();
  }

  recentlyGames() {
    const Player = new PlayerService(this.req.query.steamid);

    return Player.recentlyGames();
  }

  friendsList() {
    const User = new UserService(this.req.query.steamid);

    return User.friends();
  }

  groupList() {
    const User = new UserService(this.req.query.steamid);

    return User.groups();
  }

  bans() {
    const User = new UserService(this.req.query.steamid);

    return User.bans();
  }

  getInventory() {
    const Inventory = new InventoryService(this.req.query.steamid);

    return Inventory.stats(this.req.query.appid);
  }

  getBadgesStats() {
    const Badges = new BadgesService(this.req.query.steamid);

    return Badges.stats();
  }

  getBadgesProgress() {
    const Badges = new BadgesService(this.req.query.steamid);

    return Badges.progress(this.req.query.badgeId);
  }
}
