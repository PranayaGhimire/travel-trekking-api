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
    paymentStatus: {
        type:String,
        default:'unpaid'
    }
},{timestamps:true})

export default mongoose.model('Booking',bookingSchema);