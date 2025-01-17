import { getFile } from "../helpers/file.ts";
import { getMessageUrl } from "../helpers/message.ts";
import convert from "../convert.ts";
import { stream } from "./stream.ts";
import { Context } from "../context.ts";

export default (
  ctx: Context & {
    chat: NonNullable<Context["chat"]>;
    from: NonNullable<Context["from"]>;
    message: NonNullable<Context["message"]>;
  },
) => {
  const audio = ctx.message.audio || ctx.message.reply_to_message?.audio,
    voice = ctx.message.voice || ctx.message.reply_to_message?.voice,
    fileId = String((audio || voice)?.file_id);
  return stream(ctx, {
    url: getMessageUrl(ctx.message),
    title: audio
      ? audio.title || ctx.t("inputs.audio-file")
      : ctx.t("inputs.voice-message"),
    requester: ctx.from,
    getReadables: async () => ({ audio: convert(await getFile(fileId)) }),
  });
};
