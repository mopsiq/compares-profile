import { proxyGenerator } from "./utils/proxyGenerator.js";
import { PROXY_LIST_PATH } from "./constants/PROXY_LIST_PATH.js";

export const availableProxies = proxyGenerator(PROXY_LIST_PATH);
