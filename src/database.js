import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://cookie:c0ki3enterprise@cookie.zhxtzmt.mongodb.net/"
    );
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

export default connectDB;
