import { Chat, Client, LocalAuth, Message } from "whatsapp-web.js"
import "dotenv/config"
import { BotEngine } from "../../core/BotEngine"
import { isBlackList } from "../../application/actions/cliente/checkBlackList"
import { clientNumberFilter } from "../../helpers/clientNumberFilter"
import { clientFindOrCreate } from "../../application/actions/cliente/clientFindOrCreate"
import { logMessage } from "../../application/actions/message/logMessage"

export let client: Client = new Client({
  authStrategy: new LocalAuth(),
})

/**
 * Funcion que me ayuda a enviar desde el bot
 * @param to Hacia quien va dirigido con la nomenclatura @c.us
 * @param message 
 */
export const sendFn = async (to: string, message: string) => {
  const numero = clientNumberFilter(to)
  await logMessage({body: message, numeroCliente: numero, fromMe: true})//Guardamos en la base de datos
  await client.sendMessage(to, message) //Enviamos al cliente
}

export const startWhatsAppClient = (bot: BotEngine) => {
  // const companyName = (socket.handshake.query.company as string) || socket.id

  client.on("ready", () => {
    console.log("✅ Cliente WhatsApp listo")
  })

  client.on("message", async (msg: Message) => {
    const clientNumber = msg.from
    const chat: Chat = await msg.getChat()

    const nombre = chat.name
    const numero = clientNumberFilter(clientNumber) 

    if(!msg.from || !nombre) return // Si no hay ni mensajes ni nombre, vamos a omitirlo

    /**
     * Este es la entrada donde va a actuar el bot
     * 1.Buscamos en base de datos si el numero de celular no esta en lista negra para el bot
     * 2. Si esta activo, entramos al botEngine y respondemos
     * 3. Sino, no hacemos nada, solo recibimos y guardamos en DB
    */
   
   if (!(await isBlackList(clientNumberFilter(numero)))) {
      await chat.sendStateTyping() // Solo se activa el typing, si no está en lista negra
      /**
       * Aqui vamos a encontrar o crear "Cliente", luego insertamos el mensaje
       */

      await clientFindOrCreate({nombre, numero}) //Creamos
      await logMessage({numeroCliente: numero, body: msg.body, fromMe: msg.fromMe})//Guardamos el mensaje
      await client.sendSeen(msg.from) //Marcamos visto
      await bot.handle(msg.from, msg.body) //El Bot se encarga de responder
    }
  })

  client.initialize()
}
