import { client, sendFn } from "../whatsapp/whatsappClient"
import * as QrCode from "qrcode"
import "dotenv/config"
import { STAGE } from "../../app"
import { getClientsAction } from "../../application/actions/cliente/getClients.action"

export const connectedSockets: any[] = []

export const startSocketClient = (socket: any) => {
  connectedSockets.push(socket)

  socket?.on(
    //Entra al scoket, emit, es que emite a los sockets conectados
    "send-message",
    ({
      to,
      message,
      usuaId,
    }: {
      to: string
      message: string
      usuaId: number
    }) => {
      const chatId = to.includes("@") ? to : `${to}@c.us`
      // client.sendMessage(chatId, message)
      sendFn(chatId, message, usuaId)
      socket.broadcast.emit("get-clientes")
    }
  )

  // Evento para obtener la lista de clientes
  socket?.on("get-clients", async () => {
    await updateClientsList(socket) // Obtener lista de clientes
  })

  // client.once("qr", async (qr) => {
  //   STAGE == "dev" ? console.log("🟡 QR recibido") : ""
  //   const qrImage = await QrCode.toDataURL(qr)
  //   socket?.emit("qr", qrImage)
  // })

  // client.once("ready", () => {
  //   // console.log("✅ Cliente WhatsApp listo")
  //   socket?.emit("ready", "WhatsApp listo")
  // })
}

const updateClientsList = async (socket: any) => {
  try {
    const clientes = await getClientsAction() // Obtener lista actualizada de clientes
    socket.emit("get-clients", clientes) // Emitir la lista al cliente que hizo la solicitud

    // Emitir el evento a todos los demás clientes conectados
    socket.broadcast.emit("get-clientes", clientes) // Notificar a otros clientes
  } catch (error) {
    console.error("Error al obtener la lista de clientes:", error)
  }
}
