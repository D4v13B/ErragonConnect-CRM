import { validateError } from "./../../helpers/validateHelper"
// import { Cliente } from "./../../infraestructure/models/Cliente"
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

/**
 * Validator que me ayuda a crear un usuarios
 */
export const validateCreateuser = [
  body("nombre").notEmpty().withMessage("El campo nombre esta vacío"),
  body("email").isEmail().withMessage("El campo email está vacío"),
  body("usuario").notEmpty().withMessage("El campo usuario está vacío"),
  body("rolId")
    .notEmpty()
    .withMessage("El rol no puede estar vacío")
    .isNumeric()
    .withMessage("El campo rolId deber ser de tipo numero"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  (req: Request, res: Response, next: NextFunction) => {
    validateError(req, res, next)
  },
]
