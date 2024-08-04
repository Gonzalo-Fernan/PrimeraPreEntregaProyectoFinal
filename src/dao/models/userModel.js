import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const { Schema } = mongoose;

const collection = 'Users';

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type: String,
        unique :true
    },
    age:Number,
    password:String,
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin", "premium"]
    },
    cart : {
      type: Schema.Types.ObjectId,
      ref: "Carts",
    },
    documents: [
        {
            name: String,
            reference: String
        }
    ],
    last_connection: String
})
schema.plugin(mongoosePaginate)
const userModel = mongoose.model(collection,schema);

export default userModel;