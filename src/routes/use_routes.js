import { Router } from "express";
import { getRanking, getUserById } from "../controllers/me_rank_controller.js";
import { session } from "../middlewares/session_token.js";


const usersRoute = Router()

usersRoue.get("/users/me",session,getUserById)
usersRoue.get("/ranking",getRanking)

export default usersRoute