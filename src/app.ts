import express, { Request, Response } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { startWhatsAppClient } from "./infrastructure/whatsapp/client"
import { conectarDB } from "./infrastructure/db"
import { BotEngine } from "./core/BotEngine"
import { welcomeFlow } from "./flows/welcome.flow"

conectarDB()

export const STAGE = process.env.STAGE || "dev"

const bot = new BotEngine([welcomeFlow])
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: "*" },
})

app.use(express.static("public"))

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

io.on("connection", (socket) => {
  startWhatsAppClient(socket, bot)
  if (STAGE == "dev") {
    console.log("🟢 Cliente conectado:", socket.id)
  }

  socket.on("disconnect", () => {
    if (STAGE == "dev") {
      console.log("🔴 Cliente desconectado:", socket.id)
    }
  })
})

server.listen(3000, () => {
  console.log("🚀 Server corriendo en http://localhost:3000")
})
