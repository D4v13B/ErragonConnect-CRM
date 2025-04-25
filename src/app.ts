import express, { Request, Response } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { initClient } from "./whatsapp/client"
import { Usuario } from "./models/Usuario";
import { conectarDB } from "./config/db"; 

conectarDB()

export const STAGE = process.env.STAGE || "dev";

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: "*" },
})

app.get("/", async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json(usuarios)
})

io.on("connection", (socket) => {
  initClient(socket)
  if(STAGE == "dev"){
    console.log("🟢 Cliente conectado:", socket.id)
  }

  socket.on("disconnect", () => {
    if(STAGE == "dev"){
      console.log("🔴 Cliente desconectado:", socket.id)
    }
  })
})

server.listen(3000, () => {
  console.log("🚀 Server corriendo en http://localhost:3000")
})
