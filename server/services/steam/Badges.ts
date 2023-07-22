import { steamRequestSettings } from "../../routers/steam/request-settings.js";
import { STEAM_API_USER_KEY } from "../../constants/STEAM_API_USER_KEY.js";
import { HttpsInstance } from "../../core/Https.js";
import { getQuestStatus } from "../helpers/getQuestStatus.js";

export class BadgesService {
  private steamid;

  constructor(steamid: string) {
    this.steamid = steamid;
  }

  async stats() {
    return HttpsInstance.makeRequest({
      ...steamRequestSettings,
      path: `/IPlayerService/GetBadges/v1/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}`,
    }).then((badgesResponse) => {
      const response = badgesResponse.response;

      return {
        ...response,
        count: response.badges.length ? response.badges.length + 1 : 0,
      };
    });
  }

  async progress(badgeId: string) {
    return HttpsInstance.makeRequest({
      ...steamRequestSettings,
      path: `/IPlayerService/GetCommunityBadgeProgress/v1/?key=${STEAM_API_USER_KEY}&steamid=${this.steamid}&badgeid=${badgeId}`,
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
