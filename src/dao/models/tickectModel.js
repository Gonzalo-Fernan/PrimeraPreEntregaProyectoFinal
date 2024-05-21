import mongoose from "mongoose";

const collection = 'Ticket';
const { Schema } = mongoose

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
       
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
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
});

const Ticket = mongoose.model(collection, ticketSchema);

export default Ticket;