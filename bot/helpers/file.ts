import got from "got";
import env from "../../env.ts";
import { bot } from "../index.ts";

export const getFile = async (fileId: string) =>
  got.stream(
    `https://api.telegram.org/file/bot${env.BOT_TOKEN}/${
      (await bot.api.getFile(fileId)).file_path
    }`,
  );
