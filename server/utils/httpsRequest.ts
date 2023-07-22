import https, { RequestOptions } from "https";
import { Readable } from "stream";
import { streamToString } from "./streamToString.js";
import { logger } from "../logger.js";

export const httpsRequest = async (
  options: RequestOptions,
  callback?: (value: Readable) => Promise<Readable>,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    logger.info(`Start request with:${options.agent.proxy.href}`);
    return https
      .request(options)
      .on("response", (value) => {
        if (callback) {
          resolve(callback(value));
        } else {
          resolve(value);
        }
      })
      .on("error", (err) => reject(err))
      .end();
  }).then((incomingMessage) => {
    if (incomingMessage.statusCode !== 200) {
      logger.warn(
        `Unsuccessful request: http-code:${
          incomingMessage.statusCode
        }. proxy-server:${options.agent ? options.agent.proxy.href : ""}`,
      );
    }

    return streamToString(incomingMessage);
  });
};
