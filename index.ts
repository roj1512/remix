import { start as startBot } from "./bot/index.ts";
import { start as startUserbot } from "./userbot.ts";

Promise.all([startBot(), startUserbot()]);
