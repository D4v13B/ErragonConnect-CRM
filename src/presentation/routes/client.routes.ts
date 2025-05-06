import { Router } from "express"
import { updateClient } from "../controllers/client.controllers"

const router = Router()

router.put("/", updateClient)


export default router