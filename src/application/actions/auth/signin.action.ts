import { Usuario } from "../../../infrastructure/db/models/Usuario"


export const signin = async (
   email: string,
   password: string
): Promise<Usuario | null> => {
   try {
      const user = await Usuario.findOne({
         where: {
            email,
            password,
         },
      })

      return user ?? null
   } catch (error) {
      console.error("Error en login:", error)
      throw new Error("Error al intentar iniciar sesión.")
   }
}
