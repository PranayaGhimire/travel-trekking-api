import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Package",
        required:true
    },
    status: {
        type:String,
        default:'pending'
    },
    bookingDate: {
        type:Date,
        default:Date.now
    },
    amount:Number,
    paymentStatus: {
        type:String,
        default:'unpaid'
    },
    khaltiIdx: String
},{timestamps:true})

export default mongoose.model('Booking',bookingSchema);