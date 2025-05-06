import { Op } from "sequelize"
import { Rol } from "../../../infrastructure/db/models/Rol"
import { Usuario } from "../../../infrastructure/db/models/Usuario"


export const login = async (
   email: string,
   password: string
): Promise<Usuario | null> => {
   try {
      const user = await Usuario.findOne({
         where: {
            [Op.or]: [
               {email},
               {usuario: email}
            ],
            password
         },
         include: [Rol]
      })

      return user ?? null
   } catch (error) {
      console.error("Error en login:", error)
      throw new Error("Error al intentar iniciar sesión.")
   }
}
