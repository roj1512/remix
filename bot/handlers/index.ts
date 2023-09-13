import { Composer } from "../composer.ts";
import chatMemberUpdated from "./chat_member_updated.ts";
import controls from "./controls.ts";
import playlist from "./playlist.ts";
import search from "./search.ts";
import stream from "./stream.ts";
import lyrics from "./lyrics.ts";
import cache from "./cache.ts";
import panel from "./panel.ts";
import now from "./now.ts";

const composer = new Composer();

export default composer;

composer.use(chatMemberUpdated);

composer
  .on("message")
  .filter((ctx) => !!ctx.chat?.type.includes("group"))
  .use(stream)
  .use(playlist)
  .use(now)
  .use(search)
  .use(lyrics);

composer
  .filter(async (ctx) => {
    if (!ctx.chat?.type.includes("group") || !ctx.from) {
      return false;
    }
    const chatId = ctx.chat.id;
    if (ctx.session.admins.length == 0) {
      const members = (await ctx.api.getChatAdministrators(chatId)).filter(
        (member) =>
          (member.status == "creator" ||
            (member.status == "administrator" &&
              member.can_manage_video_chats)) &&
          !member.is_anonymous,
      );
      ctx.session.admins = [];
      for (const member of members) {
        ctx.session.admins.push(member.user.id);
      }
    }
    return ctx.session.admins.includes(ctx.from.id);
  })
  .use(panel)
  .use(cache)
  .on("message")
  .use(controls);
