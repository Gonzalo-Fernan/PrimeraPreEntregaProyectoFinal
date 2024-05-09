import { Router } from "express";
import messageController from "../dao/controllers/message.controller";

const messageRouter = Router()


messageRouter.get("/", messageController.get)

messageRouter.post("/newMessage", messageController.add )

export default messageRouter