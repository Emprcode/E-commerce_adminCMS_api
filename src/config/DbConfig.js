import mongoose from "mongoose";

export const connectDb = () => {
  try {
    mongoose.set('strictQuery', true)
    const conn = mongoose.connect(process.env.MONGO_CLIENT);
    conn && console.log("mongo connected")
  } catch (error) {
    console.log(error);
  }
};
