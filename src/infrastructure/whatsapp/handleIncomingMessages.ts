import { Chat, Message } from "whatsapp-web.js";
import { BotEngine } from "../../core/BotEngine";
import { clientNumberFilter } from "../../helpers/clientNumberFilter";
import { isBlackList } from "../../application/actions/cliente/checkBlackList";
import { clientFindOrCreate } from "../../application/actions/cliente/clientFindOrCreate";
import { logMessage } from "../../application/actions/message/logMessage";
import { client } from "./whatsappClient";
import { getClientsAction } from "../../application/actions/cliente/getClients.action";

export const handleIncomingMessage = async (msg: Message, bot: BotEngine, io?: any) => {
  const clientNumber = msg.from;
  const chat: Chat = await msg.getChat();
  const nombre = chat.name;
  const numero = clientNumberFilter(clientNumber);

  if (!clientNumber || !nombre) return;

  const estaEnListaNegra = await isBlackList(numero);

  if (!estaEnListaNegra) {
    await chat.sendStateTyping();
    await clientFindOrCreate({ nombre, numero });
    await logMessage({ numeroCliente: numero, body: msg.body, fromMe: msg.fromMe });
    await client.sendSeen(msg.from);
    await bot.handle(msg.from, msg.body);
  } else {
    await logMessage({
      body: msg.body,
      fromMe: false,
      usuaId: 1,
      numeroCliente: numero,
    });
  }

  try {
    const clientes = await getClientsAction();
    io?.emit("get-clients", clientes);
  } catch (error) {
    console.error("Error al obtener la lista de clientes:", error);
  }
};
