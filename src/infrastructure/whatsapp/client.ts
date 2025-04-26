import { Chat, Client, LocalAuth, Message } from "whatsapp-web.js"
import "dotenv/config"
import { BotEngine } from "../../core/BotEngine"

export let client: Client

export const sendFn = async (to: string, message: string) => {
  await client.sendMessage(to, message)
}

export const startWhatsAppClient = (bot: BotEngine) => {
  // const companyName = (socket.handshake.query.company as string) || socket.id
  client = new Client({
    authStrategy: new LocalAuth(),
  })

  client.on("ready", () => {
    console.log("✅ Cliente WhatsApp listo")
  })

  client.on("message", async (msg: Message) => {
    const chat: Chat = await msg.getChat()
    await chat.sendStateTyping()

    /**
     * Este es la entrada donde va a actuar el bot
     * 1.Buscamos en base de datos si el numero de celular no esta en lista negra para el bot
     * 2. Si esta activo, entramos al botEngine y respondemos
     * 3. Sino, no hacemos nada, solo recibimos y guardamos en DB
     */

    /**
     * Aqui vamos a encontrar o crear "Cliente", luego insertamos el mensaje
     */
    if (true) {
      await client.sendSeen(msg.from)
      await bot.handle(msg.from, msg.body)
    }
  })

  client.initialize()
}
