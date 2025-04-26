import { generate } from "../infrastructure/gemini/geminiService"
import { Flow } from "./Flow"

export class BotEngine {
  constructor(private flows: Flow[]) {}

  async handle(message: string): Promise<string> {
    const lower = message.toLocaleLowerCase()
    const matchedFlow = this.flows.find((f) =>
      f.keywords.some((keyword) => lower.includes(keyword))
    )

    if (matchedFlow) {
      return await matchedFlow.handler(message)
    }

    // Aqui vamos a llamar al servicio de Gemini
    return await generate(message)
  }
}
