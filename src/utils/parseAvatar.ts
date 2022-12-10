import { SteamDataStore } from "@app/types/store/SteamDataStore";

export const parseAvatar = (profile: SteamDataStore): string => {
  return profile?.profileData?.mainInfo?.avatarmedium.replace(".akamai", "");
};
