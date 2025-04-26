import { Client, LocalAuth, Message } from "whatsapp-web.js"
import "dotenv/config"
import * as QrCode from "qrcode"
import { BotEngine } from "../../core/BotEngine"

export const startWhatsAppClient = (socket: any, bot: BotEngine) => {
  const companyName = (socket.handshake.query.company as string) || socket.id
  const client = new Client({
    authStrategy: new LocalAuth(),
  })

  client.on("qr", async (qr) => {
    // console.log("🟡 QR recibido")
    const qrImage = await QrCode.toDataURL(qr)
    socket.emit("qr", qrImage)
  })

  client.on("ready", () => {
    // console.log("✅ Cliente WhatsApp listo")
    socket.emit("ready", "WhatsApp listo")
  })

  client.on("message", async (msg: Message) => {
    /**
     * Este es la entrada donde va a actuar el bot
     * 1.Buscamos en base de datos si el numero de celular tiene el bot activo
     * 2. Si esta activo, entramos al botEngineW
     * 3. Sino, no hacemos nada, solo recibimos
     */
    if (true) {
      const res = await bot.handle(msg.body)
      await client.sendMessage(msg.from, res)
    }
  })

  socket.on(
    "send-message",
    ({ to, message }: { to: string; message: string }) => {
      const chatId = to.includes("@") ? to : `${to}@c.us`
      client.sendMessage(chatId, message)
    }
  )

  client.initialize()
}
