
import mongoose from 'mongoose';




export const connectDB = async () => {
    try {
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error){
        console.log("database failed to connect: ${error.message");
        process.exit(1); //is to exit a message 1 means failure and 0 is success
    }
}