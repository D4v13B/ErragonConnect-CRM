import { AuthResponse, returnAuthResponse } from "../../../presentation/controllers/auth.controllers"
import { dataJWT } from "../../../helpers/createJWT"
import { Usuario } from "../../../infrastructure/db/models/Usuario"

export const checkClient = async (
  { id }: dataJWT,
  token: string
): Promise<AuthResponse | null> => {
  try {
    // Buscar en la base de datos
    const user = await Usuario.findOne({
      where: {
        id
      },
    })

    if (!user) {
      return null
    }

    return returnAuthResponse(user, token)
  } catch (error) {
    const e = new Error("No se ha logrado verificar al usuario")
    throw e.message
  }
}
