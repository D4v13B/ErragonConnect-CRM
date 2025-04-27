import { Op } from "sequelize"
import { Usuario } from "../../../infrastructure/db/models/Usuario"

export const saveUserAction = async ({
  nombre,
  usuario,
  email,
  password,
  verificado,
  rolId,
}: Partial<Usuario>):Promise<Usuario | null> => {
  try {
    //Buscamos si no existe el usuario
    const isExist = await Usuario.findOne({
      where: {
        [Op.or]: [
          {usuario},
          {email}
        ]
      }
    })

    if(isExist) return null

    const saveUser = await Usuario.create({
      usuario,
      nombre,
      email,
      password,
      verificado,
      rolId,
    })

    if(!saveUser) return null

    return saveUser

  } catch (error) {
    console.error(error)
    return null
  }
}
