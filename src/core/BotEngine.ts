// import { generate } from "../infrastructure/gemini/geminiService"
import { sendFn } from "../infrastructure/whatsapp/whatsAppClient"
import { Flow } from "./Flow"

export class BotEngine {
  constructor(
    private flows: Flow[],
    private sendProvider: (to: string, message: string) => Promise<void> = sendFn
  ) {}

  async handle(from: string, message: string): Promise<void> {
    const lower = message.toLocaleLowerCase()
    const matchedFlow = this.flows.find((f) =>
      f.keywords.some((keyword) => lower.includes(keyword))
    )

    //Creamos la funcion send, provieniente de whatsappWebJS para poder pasarsela al flow seleccionado y enviar mensajes desde alli
    const send = async (msg: string) => {
      await this.sendProvider(from, msg)
    }

    if (matchedFlow) {
      
      // return
      await matchedFlow.handler({ message }, { send })
    }

    // Aqui vamos a llamar al servicio de Gemini
    // await generate(message)
  }
}
