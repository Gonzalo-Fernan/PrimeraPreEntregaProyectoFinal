import logger from "../../../logger.js"
import MessageService from "../services/messageService.js"

const messagesDB = new MessageService()

class MessageController{
    constructor(){

    }
    async get (req,res){
        try {
            let allMessages = await messagesDB.getMessages()
            res.send(allMessages)
            res.render("/", {allMessages, style: "chat.css"})
            
        } catch (error) {
            logger.error("Error al obtener los mensajes ")
        }
    }
    async add (req, res){
        try {
            let newMessage = await messagesDB.addNewMessage()
            res.send(newMessage)
            
        } catch (error) {
            logger.error("Error al agregar un mesaje nuevo")
        }
    }
    
} 

export default new MessageController();