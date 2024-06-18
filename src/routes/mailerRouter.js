import { Router } from "express";
import userController from "../dao/controllers/user.controller.js";


const mailerRouter = Router()

mailerRouter.post("/mail", userController.sendMail)


export default mailerRouter