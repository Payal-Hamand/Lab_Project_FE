import mongoose from "mongoose";
import dotenv from 'dotenv' 
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Failed");
    console.error(err.message);

    process.exit(1);
  }
};

export default connectDB;