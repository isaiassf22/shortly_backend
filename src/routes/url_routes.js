import { Router } from "express";
import { session } from "../middlewares/session_token.js";


const urlRoutes =Router()

urlRoutes.post("/urls/shorten",session)
urlRoutes.get("/urls/shorten",)