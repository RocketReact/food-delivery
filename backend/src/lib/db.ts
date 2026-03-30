import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error instanceof Error ? error.message : error}`);
        process.exit(1);
    }
}

export default connectDB;