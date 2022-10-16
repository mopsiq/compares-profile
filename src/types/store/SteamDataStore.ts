import { SteamIdsProfile } from "@app/types/store/SteamIdsProfile";

export interface SteamDataStore {
  link: string;
  ids: SteamIdsProfile;
}
