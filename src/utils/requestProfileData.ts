import { SteamService } from "@app/api/Steam/SteamService";
import { ConverterResponseDTO } from "@app/types/api/dto/ConverterResponseDTO";

interface Link {
  url?: string;
  steamid?: string;
}
interface Request {
  link: Link;
  type: string;
}

const request = async ({
  link,
  type,
}: Request): Promise<ConverterResponseDTO> => {
  if (link?.steamid) {
    return Promise.resolve({ steamid: link.steamid, type });
  }

  return fetch(link.url as string)
    .then((value) => value.json())
    .then((data) => {
      return { steamid: data.response.steamid, type };
    });
};

export const requestProfileIds = async (profiles: Link[]) => {
  const [firstProfile, secondProfile] = profiles;

  return Promise.all([
    request({ link: firstProfile, type: "firstProfile" }),
    request({ link: secondProfile, type: "secondProfile" }),
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
