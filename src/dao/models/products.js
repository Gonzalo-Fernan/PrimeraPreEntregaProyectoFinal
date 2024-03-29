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
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required:true,
    },
    stock: {
        type: Number,
        required: true,
    },
    thumbnails: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

})
schema.plugin(mongoosePaginate)

 const productModel = mongoose.model(productsCollection, schema)
 export default productModel