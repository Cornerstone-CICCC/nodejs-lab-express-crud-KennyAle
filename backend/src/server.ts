import express, { Request, Response } from "express"
import dotenv from "dotenv"
import employeeRouter from "./routes/employee.routes"
let cors = require("cors")
dotenv.config()

// Creating Server
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/', employeeRouter)

const PORT = process.env.PORT || 3500
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
