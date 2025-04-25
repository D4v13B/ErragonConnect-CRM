import { Client, LocalAuth, Message } from "whatsapp-web.js"
import "dotenv/config"
import * as QrCode from "qrcode"

export const initClient = (socket: any) => {
  const companyName = (socket.handshake.query.company as string) || socket.id
  const client = new Client({
    authStrategy: new LocalAuth(),
  })

  client.on("qr", async (qr) => {
    console.log("🟡 QR recibido")
    const qrImage = await QrCode.toDataURL(qr)
    socket.emit("qr", qrImage)
  })

  client.on("ready", () => {
    console.log("✅ Cliente WhatsApp listo")
    socket.emit("ready", "WhatsApp listo")
  })

  client.on("message", async (msg: Message) => {
    console.log("📩 Mensaje recibido:", msg.body)
    socket.emit("message", {
      from: msg.from,
      body: msg.body,
    })
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
