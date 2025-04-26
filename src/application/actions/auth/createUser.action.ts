import { obtenerNuevoCasillero } from "../../helpers/obtenerCasillero"
import { sequelize } from "../../infraestructure/database"
import { Cliente } from "../../infraestructure/models/Cliente"

export const createUser = async (
   nombre: string,
   email: string,
   password: string,
   telefono: string
):Promise<Cliente> => {
   const t = await sequelize.transaction()

   try {
      const {casillero, tarifa} = await obtenerNuevoCasillero()
      
      const user = await Cliente.create({
         clie_nombre: `${nombre}`,
         clie_contrasena: password,
         clie_mail: email,
         clie_telefono: telefono,
         clie_box: casillero,
         clie_tarifa: tarifa
      })

      t.commit()
      return user
      
   } catch (error) {
      t.rollback()
      console.error("Error al momento de registrar", error)
      throw new Error("Error al crear el usuario")
   }
}