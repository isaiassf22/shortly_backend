import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from "./routes/auth_routes.js"
import urlRoutes from "./routes/url_routes.js"
import usersRoute from "./routes/use_routes.js"

dotenv.config()

const app= express()
app.use(express.json())
app.use(cors())
app.use(authRoute)


const port =process.env.PORT || 4002
app.listen(port, ()=> console.log("app running sucessfuly"))
