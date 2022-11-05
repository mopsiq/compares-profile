import { SteamIdsProfile } from "@app/types/store/SteamIdsProfile";
import { SteamProfile } from "@app/types/api/dto/SteamProfileInfoDTO";

export interface SteamDataStore {
  link: string;
  ids: SteamIdsProfile;
  profileData: SteamProfile;
}
