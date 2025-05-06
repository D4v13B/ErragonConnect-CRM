import { fn, NOW, Op } from "sequelize"
import { Mensaje } from "../../../infrastructure/db/models/Mensaje"

export const getMessaageClient = (numeroCliente: string) => {
  try {    
    const messages = Mensaje.findAll({
      where: {
        numeroCliente: numeroCliente.replace("@c.us", ""),
        createdAt: {
          [Op.gte]: fn("CURDATE")
        }
      }
    })

    return messages
  } catch (error) {
    console.error(`${error}`)
  }
}