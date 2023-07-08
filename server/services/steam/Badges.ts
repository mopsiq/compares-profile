import { FastifyReply, FastifyRequest } from "fastify";
import { httpsRequest } from "../../utils/httpsRequest.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { PROXY_SERVER } from "../../constants/PROXY_SERVER.js";
import { steamRequestSettings } from "../../routers/steam/request-settings.js";
import { STEAM_API_USER_KEY } from "../../constants/STEAM_API_USER_KEY.js";

const getQuestStatus = (quests, status: "c" | "u") =>
  quests.filter((q) => (status === "c" ? q.completed : !q.completed));

export class BadgesService {
  constructor() {}

  async stats(req: FastifyRequest, res: FastifyReply) {
    const { steamid } = req.query;

    return httpsRequest({
      ...steamRequestSettings,
      path: `/IPlayerService/GetBadges/v1/?key=${STEAM_API_USER_KEY}&steamid=${steamid}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((badgesResponse) => {
      const response = badgesResponse.response;

      return {
        ...response,
        count: response.badges.length ? response.badges.length + 1 : 0,
      };
    });
  }

  async progress(req: FastifyRequest, res: FastifyReply) {
    const { steamid, badgeId } = req.query;

    return httpsRequest({
      ...steamRequestSettings,
      path: `/IPlayerService/GetCommunityBadgeProgress/v1/?key=${STEAM_API_USER_KEY}&steamid=${steamid}&badgeid=${badgeId}`,
      agent: new HttpsProxyAgent(PROXY_SERVER),
    }).then((badgesProgressResponse) => {
      const response = badgesProgressResponse.response;

      return {
        ...response,
        completed: getQuestStatus(response.quests, "c"),
        uncompleted: getQuestStatus(response.quests, "u"),
        count: response.quests.length ? response.quests.length + 1 : 0,
      };
    });
  }
}
