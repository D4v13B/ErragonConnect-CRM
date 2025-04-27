import express from "express"
import { validateSignIn } from "../validators/auth.validator"
import { logIn } from "../controllers/auth.controllers"

const router = express.Router()

router.post("/login", validateSignIn, logIn)
// TODO Endpoint para poder registrarse
// router.post("/signup", validateSignUp, signUp)
// router.get("/profile", chechAuth, profile)

export default router