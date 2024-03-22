import { Router } from "express";
import MessagesManager from "../dao/services/messagesManagerDB";

const messageRouter = Router()
const messagesDB = new MessagesManager()


messageRouter.get("/", async (req, res)=>{

    let allMessages = await messagesDB.getMessages()
    res.send(allMessages)
    res.render("/", {allMessages, style: "chat.css"})

})

messageRouter.post("/newMessage", async(req, res) => {

    let newMessage = await messagesDB.addNewMessage()
    res.send(newMessage)


})

export default messageRouter