import MessagesManager from "../services/messagesManagerDB"

const messagesDB = new MessagesManager()

class MessageController{
    constructor(){

    }
    async get (req,res){
        let allMessages = await messagesDB.getMessages()
        res.send(allMessages)
        res.render("/", {allMessages, style: "chat.css"})
    }
    async add (req, res){
        let newMessage = await messagesDB.addNewMessage()
        res.send(newMessage)
    }
    
} 

export default new MessageController();