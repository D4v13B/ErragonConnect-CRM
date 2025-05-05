import express, { Request, Response } from "express"
import http from "http"
import https, { ServerOptions } from "https"
import fs from "fs"
import { Server } from "socket.io"
import { conectarDB } from "./infrastructure/db/db"
import indexRoutes from "./presentation/routes/index.routes"

import cors from "cors"

import { flows } from "./flows"
import { BotEngine } from "./core/BotEngine"
import { startWhatsAppClient } from "./infrastructure/whatsapp/whatsappClient"
import { startSocketClient } from "./infrastructure/socket/socketClient"

export const STAGE = process.env.STAGE || "dev"
export const PORT = process.env.PORT || 3000
export const SERVER =
  `${process.env.HOST}:${PORT}` || `http://localhost:${PORT}`
//Inicializar el bot
const bot = new BotEngine(flows)
//Habilitar cors

//Configurar el server con socketIO y CORS
const app = express()
app.use(cors())
app.use(express.json())

app.use("/", indexRoutes)

// Configurar SSL
let credentials: https.ServerOptions | http.ServerOptions | null = null

if (process.env.SSL_KEY && process.env.SSL_CERT) {
  credentials = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
    passphrase: process.env.PASSPHRASE as string
  }
}

// if(STAGE == "prod"){
//   //TODO Vamos a buscar el certificado y la llave en la base de datos main para poder asignar el SSL
//   credentials.key = ""
//   credentials.certificate = ""
// }

// Sockeet server init
// const server = createServer(app)
// let server : http.Server | https.Server

let server: http.Server | https.Server

if (STAGE === "dev") {
  server = http.createServer(app)
} else {
  if (credentials === null) {
    throw new Error("❌ SSL credentials no definidas en modo producción")
  }
  server = https.createServer(credentials, app)
}


const io = new Server(server, {
  cors: { origin: "*" },
})

// Poder usar imagenes y archivos, etc...
app.use(express.static("public"))

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

//Aplicar middleware de auth con JWT para proteger la ruta
// io.use(socketAuthMiddleware)

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

server.listen(PORT, async () => {
  console.log(`🚀 Server corriendo en ${SERVER}`)
  conectarDB()

  startWhatsAppClient(bot, io)
})
