import express from "express"

import { addExpense, getAllExpense, deleteExpense, downloadexpense } from "../controllers/expense.controllers.js"
import { clerkMiddleware } from "../middleware/clerk.middleware.js"

const router = express.Router()

router.post("/add", addExpense)
router.get("/get", getAllExpense)
router.get("/download", downloadexpense)
router.delete("/:id", deleteExpense)

export default router