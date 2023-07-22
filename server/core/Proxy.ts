import { IProxy } from "../types/IProxy.js";
import { availableProxies } from "../availableProxies.js";

class Proxy {
  proxies: IProxy[];
  defaultDelay: number;

  constructor() {
    this.proxies = availableProxies;
    this.defaultDelay = 3 * 60 * 1000;
  }

  getAvailableProxy(delay?: number) {
    const proxy = this.proxies.find(
      (p) =>
        p.usageCounter === 0 ||
        Date.now() >= p.lastUsed + (delay || this.defaultDelay),
    );

    if (!proxy) {
      return null;
    }

    return proxy;
  }

  increaseUsageCounter(index: number) {
    this.proxies[index].usageCounter += 1;
  }

  changeLastUsed(index: number) {
    this.proxies[index].lastUsed = Date.now();
  }
}

export const ProxyInstance = new Proxy();
