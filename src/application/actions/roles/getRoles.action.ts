import { Rol } from "../../../infrastructure/db/models/Rol"

export const getRolesAction = async(): Promise<Rol[] | null> => {
  try {
      const data = await Rol.findAll({
        attributes: ["id", "nombre"]
      })

      if(!data) return null

      return data
  } catch (error) {
    throw new Error(`${error}`)
  }
}