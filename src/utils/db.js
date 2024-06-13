import mongoose from "mongoose";

export const DataBase = async()=>{
    try {
      const conectionInstance =  await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to mongodb at ${conectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
    }

}