import { Mensaje } from "../../../infrastructure/db/models/Mensaje"

export interface ILogMessage {
  numeroCliente: string
  fromMe: boolean
  body: string
  usuaId?: number
}

/**
 * Registra un mensaje de un cliente.
 *
 * @param {Object} param - Parámetros de la función.
 * @param {string} param.numeroCliente - Número del cliente.
 * @param {boolean} param.fromMe - Indica si el mensaje es enviado por el sistema.
 * @param {string} param.body - Contenido del mensaje.
 * @param {number} param.usuaId - ID del usuario asociado al mensaje.
 */
export const logMessage = async ({
  numeroCliente,
  fromMe,
  body,
  usuaId = 1,
}: ILogMessage):Promise<Mensaje | undefined> => {
  try {
    const res = await Mensaje.create({
      body,
      usuaId,
      fromMe,
      numeroCliente,
    })
    return res
  } catch (error) {
    console.error(error)
    return undefined
  }
}
