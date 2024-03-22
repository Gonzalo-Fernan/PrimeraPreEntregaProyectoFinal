import mongoose from "mongoose";

const { Schema } = mongoose;

const colletion = "Productos"

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

const productModel = mongoose.model(colletion, schema)

export default productModel