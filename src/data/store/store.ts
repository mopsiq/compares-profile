import create from "solid-zustand";
import set from "solid-zustand";
import { SteamDataStore } from "@app/types/store/SteamDataStore";

interface Store {
  steamApiKey: string;
  converterApiKey: string;
  firstProfile: SteamDataStore;
  secondProfile: SteamDataStore;
}

const steamIds = {
  steam_id: "",
  steam_id3: "",
  steam_id64: "",
  steam_url: "",
};

export const store = create<Store>(() => ({
  steamApiKey: import.meta.env.VITE_STEAM_API_KEY || "",
  converterApiKey: import.meta.env.VITE_TEMPORARY_REQUEST_API_KEY || "",
  firstProfile: {
    link: "",
    ids: {
      ...steamIds,
    },
  },
  secondProfile: {
    link: "",
    ids: {
      ...steamIds,
    },
  },
}));
