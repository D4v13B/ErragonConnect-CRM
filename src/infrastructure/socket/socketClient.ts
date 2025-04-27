import { client } from "../whatsapp/whatsappClient"
import * as QrCode from "qrcode"
import "dotenv/config"
import { STAGE } from "../../app"

export const startSocketClient = (socket: any) => {
  socket?.on(
    "send-message",
    ({ to, message, usuaId }: { to: string; message: string, usuaId: number }) => {
      const chatId = to.includes("@") ? to : `${to}@c.us`
      client.sendMessage(chatId, message)
    }
  )

  client.on("qr", async (qr) => {
    STAGE == "dev" ? console.log("🟡 QR recibido") : ""
    const qrImage = await QrCode.toDataURL(qr)
    socket?.emit("qr", qrImage)
  })

  client.on("ready", () => {
    // console.log("✅ Cliente WhatsApp listo")
    socket?.emit("ready", "WhatsApp listo")
  })

}
