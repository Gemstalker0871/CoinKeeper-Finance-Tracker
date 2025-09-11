import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import path from 'path'



const app = express()

app.use(cors())

const port = process.env.PORT

dotenv.config({path: './.env'})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
