import dotenv from "dotenv";
dotenv.config({
    path:'./env'
});
import mongoose from "mongoose";
import { DB_NAME } from "./contants.js";
import connectDb from "./db/index.js";
import express from "express";


const app= express();



connectDb();





/*
( async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error",(err)=>{
        console.log(err);
        throw err;
       })
       app.listen(process.env.PORT,()=>{
              console.log(`Server is running on port ${process.env.PORT}`)    
       })
    }catch(err){
        console.log(err);
        throw err
    }
})()
*/