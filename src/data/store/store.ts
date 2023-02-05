import create from "solid-zustand";
import { SteamDataStore } from "@app/types/store/SteamDataStore";

export interface Store {
  steamApiKey: string;
  converterApiKey: string;
  firstProfile: SteamDataStore;
  secondProfile: SteamDataStore;
}

export const store = create<Store>(() => ({
  steamApiKey: import.meta.env.VITE_STEAM_API_KEY || "",
  converterApiKey: import.meta.env.VITE_TEMPORARY_REQUEST_API_KEY || "",
  firstProfile: {
    link: "",
    ids: {
      steam_id: "",
      steam_id3: "",
      steam_id64: "",
      steam_url: "",
    },
    profileData: {
      info: {
        avatar: "",
        avatarfull: "",
        avatarhash: "",
        avatarmedium: "",
        commentpermission: 0,
        communityvisibilitystate: 0,
        personaname: "",
        personastate: 0,
        personastateflags: 0,
        profilestate: 0,
        profileurl: "",
        steamid: "",
      },
      gameList: {
        game_count: 0,
        games: [
          {
            appid: 0,
            playtime_forever: 0,
            playtime_linux_forever: 0,
            playtime_mac_forever: 0,
            playtime_windows_forever: 0,
            rtime_last_played: 0,
          },
        ],
      },
    },
  },
  secondProfile: {
    link: "",
    ids: {
      steam_id: "",
      steam_id3: "",
      steam_id64: "",
      steam_url: "",
    },
    profileData: {
      info: {
        avatar: "",
        avatarfull: "",
        avatarhash: "",
        avatarmedium: "",
        commentpermission: 0,
        communityvisibilitystate: 0,
        personaname: "",
        personastate: 0,
        personastateflags: 0,
        profilestate: 0,
        profileurl: "",
        steamid: "",
      },
      gameList: {
        game_count: 0,
        games: [
          {
            appid: 0,
            playtime_forever: 0,
            playtime_linux_forever: 0,
            playtime_mac_forever: 0,
            playtime_windows_forever: 0,
            rtime_last_played: 0,
          },
        ],
      },
    },
  },
}));
