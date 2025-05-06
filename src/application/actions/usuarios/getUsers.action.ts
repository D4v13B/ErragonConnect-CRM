import { col } from "sequelize"
import { Rol } from "../../../infrastructure/db/models/Rol"
import { Usuario } from "../../../infrastructure/db/models/Usuario"

/**
 * Me trae todos los usuarios del sistema
 * @returns {Usuario[]} El arreglo de todos los usuarios totales
 */
export const getUsersAction = async (): Promise<Usuario[] | null> => {
  try {
    const data = await Usuario.findAll({
      attributes: {
        exclude: ["password", "token"],
        include: [[col("rol.nombre"), "role"]]
      },
      include: [
        {
          model: Rol,
          attributes: [],
        },
      ],
    })

    if (!data) return null

    return data
  } catch (error) {
    return null
    console.error(error)
  }
}
