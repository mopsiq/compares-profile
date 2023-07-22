import { HttpsProxyAgent } from "https-proxy-agent";
import { httpsRequest } from "../utils/httpsRequest.js";
import { RequestOptions } from "https";
import { PEM_KEY } from "../constants/PEM_KEY.js";
import { CRT_KEY } from "../constants/CRT_KEY.js";
import { ProxyInstance } from "./Proxy.js";
import { PROXY_SERVER } from "../constants/PROXY_SERVER.js";
import { logger } from "../logger.js";

interface HttpsRequestOptions extends RequestOptions {
  endpointDelay?: number;
}

export class Https {
  private cert;
  private key;

  constructor() {
    this.cert = CRT_KEY;
    this.key = PEM_KEY;
  }

  async makeRequest(options: HttpsRequestOptions) {
    const availableProxy = ProxyInstance.getAvailableProxy(
      options?.endpointDelay,
    );
    logger.debug(
      `Used proxy:${availableProxy?.url}. Request path:${options.path}`,
    );

    return httpsRequest({
      ...options,
      cert: this.cert,
      key: this.key,
      agent: new HttpsProxyAgent(
        availableProxy ? availableProxy.url : PROXY_SERVER,
      ),
    }).then((response) => {
      if (availableProxy) {
        ProxyInstance.increaseUsageCounter(availableProxy.index);
        ProxyInstance.changeLastUsed(availableProxy.index);
      }

      return response;
    });
  }
}

export const HttpsInstance = new Https();
