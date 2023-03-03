import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from "./routes/auth_routes.js"

dotenv.config()

const app= express()

app.use(cors())
app.use(express.json())
app.use(authRoute)

const port =process.env.PORT || 5002
app.listen(port, ()=> console.log("app running sucessfuly"))
