import mongoose from "mongoose";



const { Schema } = mongoose

const collection = "Carts"

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Productos",
            require : true,
        },
        quantity: {
            type: Number,
            require: true,
        },
    },
],

});

//midleware que aplica populate al metodo find
schema.pre("find", function (){
    this.populate("products.product")
})


const cartsModel = mongoose.model(collection, schema)

export default cartsModel