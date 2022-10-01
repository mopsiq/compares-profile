import create from "solid-zustand";

interface Store {}

export const store = create<Store>(() => ({}));
