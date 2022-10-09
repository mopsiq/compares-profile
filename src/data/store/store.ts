import create from "solid-zustand";
import set from "solid-zustand";

interface SteamProfile {
  link: string;
  info: any;
}

interface Store {
  steamApiKey: string;
  converterApiKey: string;
  firstProfile: SteamProfile;
  secondProfile: SteamProfile;
}

export const store = create<Store>(() => ({
  steamApiKey: import.meta.env.VITE_STEAM_API_KEY || "",
  converterApiKey: import.meta.env.VITE_TEMPORARY_REQUEST_API_KEY || "",
  firstProfile: {
    link: "",
    info: {},
  },
  secondProfile: {
    link: "",
    info: {},
  },
}));
