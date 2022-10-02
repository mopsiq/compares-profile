import create from "solid-zustand";

interface Store {
  apiKey: string;
}

export const store = create<Store>(() => ({
  apiKey: import.meta.env.VITE_STEAM_API_KEY || "",
}));
