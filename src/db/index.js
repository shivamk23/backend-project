import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";


const connectDb=async()=>{
    console.log("DB_NAME",DB_NAME);
    try{
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       console.log(`DB is connected to ${connectionInstance.connection.host}`);
        // application.on("error",(err)=>{
        //     console.log(err);
        //     throw err;
        // })
    }catch(err){
        console.log("DB Connection err",err);
        process.exit();
    }
}

export default connectDb;