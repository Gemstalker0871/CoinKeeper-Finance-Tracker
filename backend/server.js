import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import path from 'path'
import connectDB from './config/db.js'
import { clerkMiddleware } from "./middleware/clerk.middleware.js";
import incomeRoute from "./routes/income.route.js"
import expenseRoute from "./routes/expense.route.js"
import dashboardRoute from "./routes/dashboard.route.js"
import { fileURLToPath } from 'url';


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors())

dotenv.config({path: './.env'})

const PORT = process.env.PORT
app.use(express.json());



await connectDB()

app.use("/api/v1/auth", clerkMiddleware)
app.use("/api/v1/income", clerkMiddleware, incomeRoute)
app.use("/api/v1/expense", clerkMiddleware, expenseRoute)
app.use("/api/v1/dashboard", clerkMiddleware, dashboardRoute)

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../frontend/dist");

  app.use(express.static(distPath));

  app.get(/^\/(?!api).*/, (req, res) => {

    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
