import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { signInValidate, userValidate } from "../middlewares/auth_middleware.js";
import userSchema from "../schema/authSchema.js";


const authRoute = Router()

authRoute.post("/signup",userValidate(userSchema),signUp)
authRoute.post("signin",signInValidate)


export default authRoute