import mongoose from "mongoose"
import { environment } from "./environment.config.js"

const DB_URL = environment.mongo_url

const dbConnection = async()=>{
    try {
        await mongoose.connect(DB_URL)
        console.log("conectado a DB");
    } catch (error) {
        console.log("error base de datos");
        process.exit()
    }
   
}

export default dbConnection;