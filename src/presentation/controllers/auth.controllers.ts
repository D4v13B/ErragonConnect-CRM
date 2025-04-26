// import { Usua } from "../../infraestructure/models/Cliente"
import { Usuario } from "../../infrastructure/db/models/Usuario"
import { createJWT } from "../../helpers/createJWT"
import { Request, Response } from "express"
import { signin } from "../../application/actions/auth/signin.action"
import { RequestCustom } from "../../domain/interfaces/RequestCustom"
import { createUser } from "../../application/actions/auth/createUser.action" 
// import { newBoxEmail } from "../../actions/emails/newBox.email"
// import { sendPushNotifications } from "../../actions/expo/sendPushNotification"

export interface User {
   id: number
   nombre: string
   email: string
   rolId: number
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
      token
   }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
   const { email, password } = req.body

   try {
      const user = await signin(email, password)

      if (!user) {
         res.status(404).json({ message: "Usuario o contraseña incorrectos" })
         return
      }

      const userData = returnAuthResponse(
         user,
         createJWT({ id: user.id, email: user.email as string })
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
      const user = await createUser(nombre, email, password, telefono)

      if(!user){
         throw new Error("Error al momento de crear el usuario")
      }

      // newBoxEmail(nombre, user.clie_box, email) //Notificacion 
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

      const userData = returnAuthResponse(user, createJWT({ id: user.clie_id, email: user.email as string }))

      res.json(userData)

   }catch(err){
      console.error(err)
      res.status(500).json({msg: "Ha ocurrido un error", err})
   }
}