import express from "express"
import { getRoles } from "../controllers/roles.controller"

const router = express.Router()

router.get("/", getRoles)

export default router