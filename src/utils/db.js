import mongoose from "mongoose";

export const DataBase = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongodb");
    } catch (error) {
        console.log(error);
    }

}