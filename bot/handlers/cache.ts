import { Composer } from "../composer.ts";

const composer = new Composer();

export default composer;

composer.command(["cache", "caches"], (ctx) => {
  ctx.session.admins = [];
  ctx.session.search = undefined;
  ctx.session.loop = false;
  return ctx.reply(ctx.t("cache"));
});
