import mongoose from "mongoose";
import env from "./env"
export  const connectDb = async()=>{
    try {
        mongoose.connect(env.MONGODB as string)
        console.log(`database connected`)
    } catch (error) {
        console.log(error)
        
    }
}