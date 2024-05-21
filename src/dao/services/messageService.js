import messagesModel from "../models/messages.js";



export default class MessageService {
    constructor(){

    }
    getMessages = async () => {

        try {
            await messagesModel.find().lean()
        } catch (error) {
            console.log(error, "no se pudieron mostrar los mensajes");
        }

    }
    addNewMessage = async (newMessage) =>{
        try {
            const messageToAdd = new messagesModel
            messageToAdd.user = newMessage.user
            messageToAdd.message= newMessage.message
          
            await messageToAdd.save()

        } catch (error) {
            console.log(error, "no se pudo agregar el mensaje");
        }

    }
}