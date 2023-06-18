import https from "https";
import { Readable } from "stream";

interface HttpsOptions {
  key: string;
  cert: string;
  host: string;
  method: string;
  path: string;
}

export const httpsRequest = (
  options: HttpsOptions,
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
