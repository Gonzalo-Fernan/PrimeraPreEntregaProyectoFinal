import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const productsCollection = "Productos"

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
        min: [1] 
    },
    price: {
        type: Number,
        required: true,
        min: [1] 
    },
    status: {
        type: Boolean,
        required:true,
    },
    stock: {
        type: Number,
        required: true,
        min: [1] 
    },
    thumbnails: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
    }

})
schema.plugin(mongoosePaginate)

 const productModel = mongoose.model(productsCollection, schema)
 export default productModel