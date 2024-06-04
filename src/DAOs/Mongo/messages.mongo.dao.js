import messagesModel from "../../dao/models/messages.js";
import logger from "../../../logger.js"

class MessageMongoDao {
    constructor(){

    }
    getMessages = async () => {

        try {
            await messagesModel.find().lean()
        } catch (error) {
            logger.error("Error al obtener los mensajes")
        }

    }
    addNewMessage = async (newMessage) =>{
        try {
            const messageToAdd = new messagesModel
            messageToAdd.user = newMessage.user
            messageToAdd.message= newMessage.message
          
            await messageToAdd.save()

        } catch (error) {
            logger.error("no se pudo agregar el mensaje");
        }

    }
}
export default new MessageMongoDao()