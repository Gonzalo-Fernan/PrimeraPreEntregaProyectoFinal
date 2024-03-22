import messagesModel from "../models/messages";
import mongoose from "mongoose";


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
    addNewMessage = async () =>{
        try {
            const newMessage = new messagesModel
            await newMessage.save()
        } catch (error) {
            console.log(error, "no se pudo agregar el mensaje");
        }

    }
}