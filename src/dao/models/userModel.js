import mongoose, { Types } from 'mongoose';

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
        default: "user"
    }
})

const userModel = mongoose.model(collection,schema);

export default userModel;