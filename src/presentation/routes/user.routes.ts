import express from "express"
import { getUsers, saveUser } from "../controllers/user.controller"
import { validateCreateuser } from "../validators/auth.validator"

const router = express.Router()

router.get("/", getUsers)
router.post("/", validateCreateuser, saveUser)

export default router