import { PEM_KEY } from "../../constants/PEM_KEY.js";
import { CRT_KEY } from "../../constants/CRT_KEY.js";

export const steamRequestSettings = {
  key: PEM_KEY,
  cert: CRT_KEY,
  host: "api.steampowered.com",
};
