import mongoose from "mongoose";
import obj from "./variable.js";
const connectDB = async () => {
  try {
    await mongoose.connect(obj.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
