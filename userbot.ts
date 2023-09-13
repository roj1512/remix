import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.ts";
import { LogLevel } from "telegram/extensions/Logger.ts";
import env from "./env.ts";

export const client = new TelegramClient(
  new StringSession(env.STRING_SESSION),
  env.API_ID,
  env.API_HASH,
  {
    connectionRetries: 10,
  },
);

client.setLogLevel(LogLevel.NONE);

export const start = () => client.start({ botAuthToken: "" });
