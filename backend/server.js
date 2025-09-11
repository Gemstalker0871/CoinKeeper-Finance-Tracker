import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import path from 'path'
import connectDB from './config/db.js'
import { clerkMiddleware } from "./middleware/clerk.middleware.js";
import incomeRoute from "./routes/income.route.js"
//import expenseRoute from "./routes/expense.route.js"



const app = express()


app.use(cors())

dotenv.config({path: './.env'})

const PORT = process.env.PORT
app.use(express.json());



await connectDB()

app.use("/api/v1/auth", clerkMiddleware)
app.use("/api/v1/income", clerkMiddleware,incomeRoute)
//app.use("/api/v1/expense", expenseRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
