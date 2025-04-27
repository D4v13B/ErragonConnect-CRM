import https from "https"

import express, { Request, Response } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { conectarDB } from "./infrastructure/db/db"
import indexRoutes from "./presentation/routes/index.routes"

import cors from "cors"

import { flows } from "./flows"
import { BotEngine } from "./core/BotEngine"
import { startWhatsAppClient } from "./infrastructure/whatsapp/whatsappClient"
import { startSocketClient } from "./infrastructure/socket/socketClient"

export const STAGE = process.env.STAGE || "dev"
//Inicializar el bot
const bot = new BotEngine(flows)
//Habilitar cors

//Configurar el server con socketIO y CORS
const app = express()
app.use(cors())
app.use(express.json())

app.use("/", indexRoutes)

// Sockeet server init
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: "*" },
})

// Poder usar imagenes y archivos, etc...
app.use(express.static("public"))

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

// Inicializar el cliente de whatsApp apenas nos conectamos al socket
io.on("connection", (socket) => {
  startSocketClient(socket)
  if (STAGE == "dev") {
    console.log("🟢 Cliente conectado:", socket.id)
  }

  socket.on("disconnect", () => {
    if (STAGE == "dev") {
      console.log("🔴 Cliente desconectado:", socket.id)
    }
  })
})

server.listen(3000, async () => {
  console.log(`🚀 Server corriendo en http://localhost:3000`)
  conectarDB()

  startWhatsAppClient(bot)
})