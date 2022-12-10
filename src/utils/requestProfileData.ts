import { ItemConverter } from "@app/types/api/ItemConverter";
import { SteamService } from "@app/api/Steam/SteamService";

const request = async (link: string, type: string): Promise<ItemConverter> => {
  return fetch(link)
    .then((value) => value.json())
    .then((data) => {
      return { ...data, type };
    });
};

export const requestProfileIds = async (profiles: string[]) => {
  const [firstProfile, secondProfile] = profiles;

  return Promise.all([
    request(firstProfile, "firstProfile"),
    request(secondProfile, "secondProfile"),
  ]);
};

export const requestProfileData = async (profilesSteamIds: string[]) => {
  const service = new SteamService();

  const data = profilesSteamIds.map(async (item) => {
    const info = await service.profileInfo(item);
    const list = await service.gameList(item);
    return { info: info.response.players[0], gameList: list.response };
  });

  return Promise.all(data);
};
