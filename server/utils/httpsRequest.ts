import https, { RequestOptions } from "https";
import { Readable } from "stream";

export const httpsRequest = (
  options: RequestOptions,
  callback?: (value: Readable) => Promise<Readable>,
): Promise<Readable> => {
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
  });
};
