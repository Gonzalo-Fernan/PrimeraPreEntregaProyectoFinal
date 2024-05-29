import messagesMongoDao from "../../DAOs/Mongo/messages.mongo.dao.js";


export default class MessageService {
    constructor(){

    }
    getMessages = async () => {

        try {
            await messagesMongoDao.getMessages()
        } catch (error) {
            console.log(error, "no se pudieron mostrar los mensajes");
        }

    }
    addNewMessage = async (newMessage) =>{
        try {
            await messagesMongoDao.addNewMessage()

        } catch (error) {
            console.log(error, "no se pudo agregar el mensaje");
        }

    }
}