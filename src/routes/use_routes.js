import { Router } from "express";
import { getRanking, getUserById } from "../controllers/me_rank_controller.js";
import { session } from "../middlewares/session_token.js";


const usersRoute = Router()

usersRoute.get("/users/me",session,getUserById)
usersRoute.get("/ranking",getRanking)

export default usersRoute