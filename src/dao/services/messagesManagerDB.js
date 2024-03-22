import messagesModel from "../models/messages.js";



export default class MessagesManager {
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
            console.log(messageToAdd);
            await messageToAdd.save()

        } catch (error) {
            console.log(error, "no se pudo agregar el mensaje");
        }

    }
}