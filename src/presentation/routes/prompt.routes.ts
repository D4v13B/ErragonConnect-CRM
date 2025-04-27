import express from "express"
import { getPrompt, savePrompt } from "../controllers/prompt.controller"

const router = express.Router()

router.get("/", getPrompt)
router.post("/", savePrompt)

export default router