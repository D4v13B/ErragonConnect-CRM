import { createFlow } from "../core/Flow"
import { generate } from "../infrastructure/gemini/geminiService"

export const geminiFlow = createFlow([""], async (ctx, tools) => {
  const res = await generate(ctx.message, ctx.clientNumber)
  await tools.send(res)
})
