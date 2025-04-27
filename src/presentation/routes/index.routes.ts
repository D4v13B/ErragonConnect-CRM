import { Router } from "express"
import authRoutes from "./auth.routes"
import promptRoutes from "./prompt.routes"


const router = Router()

router.use("/auth", authRoutes)
router.use("/prompt", promptRoutes)

export default router