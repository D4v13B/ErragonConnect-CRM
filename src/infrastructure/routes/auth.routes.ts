import express from "express"
// import { validateSignUp, validateSignIn } from "../validators/auth.validator"
// import { profile, signIn, signUp } from "../../adapters/controllers/auth.controllers"
// import { profile, signIn, signUp } from "../controllers/auth.controllers"
import { chechAuth } from "../../presentation/middleware/checkAuth.middleware"
// import { createUser } from "../actions/auth/createUser.action"

const router = express.Router()

// router.post("/signin", validateSignIn, signIn)
// TODO Endpoint para poder registrarse
// router.post("/signup", validateSignUp, signUp)
// router.get("/profile", chechAuth, profile)

export default router