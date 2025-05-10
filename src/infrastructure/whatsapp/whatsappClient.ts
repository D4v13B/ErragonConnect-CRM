import { Client, LocalAuth, Message } from "whatsapp-web.js"
import "dotenv/config"
import * as QrCode from "qrcode"
import { BotEngine } from "../../core/BotEngine"
import { clientNumberFilter } from "../../helpers/clientNumberFilter"
import { logMessage } from "../../application/actions/message/logMessage"
import { handleIncomingMessage } from "./handleIncomingMessages"
import { connectedSockets } from "../socket/socketClient"

let listenersInicializados = false

export let client: Client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
})

/**
 * Funcion que me ayuda a enviar desde el bot
 * @param to Hacia quien va dirigido con la nomenclatura @c.us
 * @param message
 */
export const sendFn = async (to: string, message: string, usuaId?: number) => {
  const numero = clientNumberFilter(to)
  await logMessage({
    body: message,
    numeroCliente: numero,
    fromMe: true,
    usuaId,
  }) //Guardamos en la base de datos
  await client.sendMessage(to, message) //Enviamos al cliente
}

export const startWhatsAppClient = (bot: BotEngine, io?: any) => {
  // const companyName = (socket.handshake.query.company as string) || socket.id

  if (listenersInicializados) return
  listenersInicializados = true

  client.once("ready", () => {
    console.log("✅ Cliente WhatsApp listo")
    connectedSockets.forEach((socket) => {
      socket.emit("ready", "WhatsApp listo")
    })
  })

  client.once("qr", async (qr) => {
    console.log("🟡 QR recibido")
    const qrImage = await QrCode.toDataURL(qr)
    connectedSockets.forEach((socket) => {
      socket.emit("qr", qrImage)
    })
  })

  client.once("message", async (msg: Message) => {
    await handleIncomingMessage(msg, bot, io)
  })

  client.initialize()
}
