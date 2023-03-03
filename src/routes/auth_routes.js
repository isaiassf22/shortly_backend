import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { userValidate } from "../middlewares/auth_middleware.js";


const authRoute = Router()

authRoute.post("/signup",signUp)
authRoute.get("signin",)


export default authRoute