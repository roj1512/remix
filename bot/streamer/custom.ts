import { User } from "@grammyjs/types";
import { getMessageUrl } from "../helpers/message.ts";
import { Context } from "../context.ts";
import { stream } from "./stream.ts";
import convert from "../convert.ts";

export default (
  ctx: Context & {
    chat: NonNullable<Context["chat"]>;
    from: NonNullable<Context["from"]>;
    message: NonNullable<Context["message"]>;
  },
  input: string,
) =>
  stream(ctx, {
    url: getMessageUrl(ctx.message),
    title: ctx.t("inputs.custom"),
    requester: ctx.from as User,
    getReadables: () => ({ audio: convert(input) }),
  });
