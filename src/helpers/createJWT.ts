import JWT from "jsonwebtoken"

export interface dataJWT{
   id: number
   email: string
   rol: string
   rolId: number
}

export const createJWT = (data: dataJWT) => {
   return JWT.sign(data, process.env.JWT_SECRET as string)
}