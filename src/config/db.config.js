import mongoose from "mongoose"

const DB_URL= 'mongodb+srv://gondev:4822217@clustercoder.rfuiylg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCoder'

const dbConnection = async()=>{
    //'mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority'
    try {
        await mongoose.connect(DB_URL)
        console.log("conectado a DB");
    } catch (error) {
        console.log("error base de datos");
        process.exit()
    }
   
}

export default dbConnection;