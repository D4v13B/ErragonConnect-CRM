import { Op } from "sequelize"
import { Cliente } from "../../../infrastructure/db/models/Cliente"

/**
 * Verifica en la base de datos si el numero de celular esta en lista negra y el bot no le debe de responder
 * @param numero Numero de telefono del cliente
 * @returns true -> si esta en la lista negra, false -> no esta en la lista negra
 */
export const isBlackList = async (numero: string): Promise<boolean> => {
  try {
    //Bot activo es **false** o seaa que esta en la lista negra
    const res = await Cliente.findOne({
      where: {
        [Op.and]: {
          numero,
          botActivo: false,
        },
      },
    })

    if (res) return true

    return false
  } catch (error) {
    console.error(error)
    return false
  }
}
