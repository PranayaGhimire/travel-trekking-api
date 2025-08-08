import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewURLParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error('MongoDB Connection Failed ',error);
        process.exit(1);
    }
};
