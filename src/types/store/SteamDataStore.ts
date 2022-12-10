import { SteamIdsProfile } from "@app/types/store/SteamIdsProfile";
import { SteamProfile } from "@app/types/api/dto/SteamProfileInfoDTO";
import { SteamGames } from "@app/types/api/dto/SteamGameListDTO";

export interface SteamDataStore {
  link: string;
  ids: SteamIdsProfile;
  profileData: {
    mainInfo: SteamProfile;
    gamesList: {
      game_count: number;
      games: SteamGames[];
    };
  };
}
