import https, { RequestOptions } from "https";
import { Readable } from "stream";
import { streamToString } from "./streamToString.js";

export const httpsRequest = (
  options: RequestOptions,
  callback?: (value: Readable) => Promise<Readable>,
): Promise<any> => {
  return new Promise((resolve, reject) => {
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
  }).then((incomingMessage) => streamToString(incomingMessage));
};
