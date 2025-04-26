import { Client, LocalAuth, Message } from "whatsapp-web.js"
import "dotenv/config"
import { BotEngine } from "../../core/BotEngine"

export let client: Client

export const sendFn = async (to: string, message: string) => {
  await client.sendMessage(to, message)
}

export const startWhatsAppClient = (bot: BotEngine) => {
  // const companyName = (socket.handshake.query.company as string) || socket.id
  client = new Client({
    authStrategy: new LocalAuth()
  })

  client.on("ready", () => {
    console.log("✅ Cliente WhatsApp listo")
  })

  client.on("message", async (msg: Message) => {
    /**
     * Este es la entrada donde va a actuar el bot
     * 1.Buscamos en base de datos si el numero de celular tiene el bot activo
     * 2. Si esta activo, entramos al botEngineW
     * 3. Sino, no hacemos nada, solo recibimos
     */
    if (true) {
      await bot.handle(msg.from, msg.body)
      // await client.sendMessage(msg.from, res)
    }
  })

  client.initialize()
}
