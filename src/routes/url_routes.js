import { Router } from "express";
import { deleteUrl, getUrlId, openShortUrl, shortenUrl } from "../controllers/url_controller.js";
import { session } from "../middlewares/session_token.js";


const urlRoutes =Router()

urlRoutes.post("/urls/shorten",session,shortenUrl)
urlRoutes.get("/urls/:id",getUrlId)
urlRoutes.get("/urls/open/:shortUrl",openShortUrl)
urlRoutes.delete("/urls/open/:shortUrl",session,deleteUrl)

export default urlRoutes