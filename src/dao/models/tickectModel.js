import mongoose from "mongoose";

const collection = 'Ticket';
const { Schema } = mongoose

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true
       
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        ref: "Users",
      },
});

const Ticket = mongoose.model(collection, ticketSchema);

export default Ticket;