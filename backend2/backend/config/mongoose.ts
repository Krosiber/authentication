import env from "./env"
import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(env.MONGO_URL as string,{
            serverApi:`1`
        })
        console.log(`basarili`)
    } catch (error) {
        console.log(error)
        
    }
}