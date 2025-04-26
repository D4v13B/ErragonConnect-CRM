import { validateError } from "./../../helpers/validateHelper"
import { Cliente } from "./../../infraestructure/models/Cliente"
import { NextFunction, Request, Response } from "express"

const { body } = require("express-validator")

/**
 * Esta funcion me valida si hay un email, un nombre y una password
 */
export const validateSignIn = [
   body("email").isEmail().withMessage("El campo email esta vacío"),
   body("password").notEmpty().withMessage("La contraseña es obligatoria"),
   (req: Request, res: Response, next: NextFunction) => {
      validateError(req, res, next)
   },
]

export const validateSignUp = [
   body("nombre").notEmpty().withMessage("El campo nombre esta vacío"),
   body("email").isEmail().withMessage("El campo email esta vacío"),
   body("password").notEmpty().withMessage("La contraseña es obligatoria"),
   body("telefono").notEmpty().withMessage("El teléfono no puede estar vacío"),
   (req: Request, res: Response, next: NextFunction) => {
      validateError(req, res, next)
   },
]