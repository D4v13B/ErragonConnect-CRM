import { client } from "../whatsapp/whatsAppClient"
import * as QrCode from "qrcode"
import "dotenv/config"

export const startSocketClient = (socket: any) => {
  socket?.on(
    "send-message",
    ({ to, message }: { to: string; message: string }) => {
      const chatId = to.includes("@") ? to : `${to}@c.us`
      client.sendMessage(chatId, message)
    }
  )

  client.on("qr", async (qr) => {
    // console.log("🟡 QR recibido")
    const qrImage = await QrCode.toDataURL(qr)
    socket?.emit("qr", qrImage)
  })

  client.on("ready", () => {
    // console.log("✅ Cliente WhatsApp listo")
    socket?.emit("ready", "WhatsApp listo")
  })

}
