import mongoose from "mongoose";


const destinationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:String,
    description:String,
    bestSeason:String,
    imageUrl:String,
}, {timestamps:true} );

export default mongoose.model('Destination',destinationSchema);