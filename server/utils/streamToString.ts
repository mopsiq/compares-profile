import { Readable } from "stream";
import { gunzip } from "zlib";
import { fileTypeFromBuffer } from "file-type";

const decompressedGzipBuffer = async (chunk: any) => {
  return new Promise((resolve, reject) => {
    gunzip(chunk, (err, decompressed) => {
      if (err) {
        reject(err);
      } else {
        resolve(decompressed);
      }
    });
  });
};

export const streamToString = async (stream: Readable): Promise<any> => {
  const chunks: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    stream
      .on("data", (chunk) => chunks.push(chunk))
      .on("error", (err) => reject(err))
      .on("end", () => resolve(chunks));
  })
    .then(async (data) => {
      const fileType = await fileTypeFromBuffer(
        Buffer.concat(data as Uint8Array[]),
      );

      if (fileType?.ext === "gz") {
        const decompressed = await decompressedGzipBuffer(
          Buffer.concat(chunks),
        );

        return [decompressed];
      } else {
        return data;
      }
    })
    .then((data) => Buffer.concat(data).toString("utf8"));
};
