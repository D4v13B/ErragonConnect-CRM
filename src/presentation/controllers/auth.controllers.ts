import { Usuario } from "../../infrastructure/db/models/Usuario"
import { createJWT } from "../../helpers/createJWT"
import { Request, Response } from "express"
import { login } from "../../application/actions/auth/login.action"
import { RequestCustom } from "../../domain/interfaces/RequestCustom"

export interface User {
   id: number
   nombre: string
   email: string
   rolId: number
   rol: string
}
export interface AuthResponse extends User {
   token: string
}

export const returnAuthResponse = (
   user: Usuario,
   token: string
): AuthResponse => {
   return {
      id: user.id,
      nombre: user.nombre as string,
      email: user.email as string,
      rolId: user.rolId,
      rol: user.rol.nombre,  
      token
   }
}

export const logIn = async (req: Request, res: Response): Promise<void> => {
   const { email, password } = req.body

   try {
      const user = await login(email, password)

      if (!user) {
         res.status(404).json({ message: "Usuario o contraseña incorrectos" })
         return
      }

      const userData = returnAuthResponse(
         user,
         createJWT({ id: user.id, email: user.email as string, rol: user.rol.nombre, rolId: user.rol.id })
      )

      res.status(200).json(userData)
      return
   } catch (error) {
      console.error("Error al iniciar sesión:", error)
      res.status(500).json({ message: "Error al momento de iniciar sesión" })
      return
   }
}

// TODO: Implementar el registro de los usuarios

export const profile = async (
   req: RequestCustom,
   res: Response
): Promise<void> => {
   //Tiene que enviar un AuthResponse

   try {
      res.json(req.cliente)
   } catch (error) {
      console.error("Error al checkStatus: ", error)
      res.status(500).json({ message: "No se ha podido verificar la sesión" })
   }
}

export const signUp = async (
   req: RequestCustom,
   res: Response
):Promise<void> => {

   const {nombre, email, password, telefono, pushToken} = req.body

   try{
      console.log(pushToken)
      // const user = await createUser(nombre, email, password, telefono)
      let user

      if(!user){
         throw new Error("Error al momento de crear el usuario")
      }

      // newBoxEmail(nombre, email) //Notificacion 
      /**
       * Push token notification
       */
      // if(pushToken){
      //    sendPushNotifications([
      //       {
      //          title: "Genial has creado tu nuevo casillero!",
      //          body: "Ahora puedes realizar compras desde todo internet",
      //          to: pushToken
      //       }
      //    ])
      // }

      // const userData = returnAuthResponse(user, createJWT({ id: user.clie_id, email: user.email as string }))

      // res.json(userData)

   }catch(err){
      console.error(err)
      res.status(500).json({msg: "Ha ocurrido un error", err})
   }
}