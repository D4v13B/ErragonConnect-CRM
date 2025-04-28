import { Cliente } from "../../../infrastructure/db/models/Cliente"
import { Mensaje } from "../../../infrastructure/db/models/Mensaje"

export const getClientsAction = async () => {
  try {
    const clientes = await Cliente.findAll({
      include: [
        {
          model: Mensaje,
          as: "mensajes",
          required: false,
        },
      ],
      order: [[{ model: Mensaje, as: "mensajes" }, "createdAt", "ASC"]],
    })

    return clientes
  } catch (error) {
    throw error
  }
}
