import mongoose from "mongoose";


const packageSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    destination:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    duration:String,
    itinerary:String,
    difficulty:String,
    imageUrl:String,
},{ timestamps:true });

export default mongoose.model("Package",packageSchema);