import { createFlow } from "../core/Flow"
import { generate } from "../infrastructure/gemini/geminiService"

export const geminiFlow = createFlow([""], async (ctx, tools) => {
  const res = await generate(ctx.message)
  await tools.send(res)
})
