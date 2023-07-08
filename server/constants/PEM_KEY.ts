import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const PEM_KEY = fs.readFileSync(process.env.PEM_KEY as string, "utf-8");
