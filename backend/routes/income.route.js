import express from "express"

import { addIncome, getAllIncome, deleteIncome, downloadIncome } from "../controllers/income.controllers.js"
import { clerkMiddleware } from "../middleware/clerk.middleware.js"

const router = express.Router()

router.post("/add", addIncome)
router.get("/get", getAllIncome)
router.get("/download", downloadIncome)
router.delete("/:id", deleteIncome)

export default router