import { NextFunction, Response } from "express"
import { RequestCustom } from "../../domain/interfaces/RequestCustom"
import JWT from "jsonwebtoken"
import { checkClient } from "../../application/actions/auth/checkClient.action"
import { dataJWT } from "../../helpers/createJWT"

export const chechAuth = async (
   req: RequestCustom,
   res: Response,
   next: NextFunction
) => {
   let token

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      // Vamos a verificar

      try {
         token = req.headers.authorization.split(" ")[1]

         const decodedData = JWT.verify(
            token,
            process.env.JWT_SECRET as string
         ) as dataJWT

         const authData = await checkClient(decodedData, token)

         if (!authData) {
            res.status(403).json({ msg: "Usuario sin permisos" })
            return
         }

         req.cliente = authData
         next()

      } catch (error) {
         const e = new Error("Token inválido")
         res.status(403).json({ message: e.message })
         return
      }
   }

   if (!token) {
      const error = new Error("Token no Válido o inexistente")
      res.status(403).json({ msg: error.message })
      return
   }
}
