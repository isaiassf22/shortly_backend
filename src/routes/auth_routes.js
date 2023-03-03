import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { signInValidate, userValidate } from "../middlewares/auth_middleware.js";


const authRoute = Router()

authRoute.post("/signup",userValidate,signUp)
authRoute.get("signin",signInValidate)


export default authRoute