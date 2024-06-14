import { Router } from "express";
import userController from "../dao/controllers/user.controller.js";


const mailerRouter = Router()

mailerRouter.get("/mail", userController.restorePassword)

export default mailerRouter