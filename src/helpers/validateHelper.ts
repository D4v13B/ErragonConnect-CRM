import { NextFunction, Request, Response } from "express"
const { validationResult } = require("express-validator")

export const validateError = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      validationResult(req).throw()
      next()
      return
   } catch (error) {
      res.status(403).json({ error })
   }
}
