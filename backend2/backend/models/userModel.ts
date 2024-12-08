import mongoose, { Schema } from "mongoose";


export interface IUser extends Document{
    name:string,
    password:string
}

export const userModel = new Schema<IUser>({
    name:{
        type:String,required:true,unique:true
    },
    password:{
        type:String,required:true
    }
    
})


export  const User = mongoose.model(`backend3`,userModel)