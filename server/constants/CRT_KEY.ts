import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const CRT_KEY = fs.readFileSync(process.env.CRT_KEY as string, "utf-8");
