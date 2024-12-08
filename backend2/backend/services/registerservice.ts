import mongoose from "mongoose";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs"
interface IUser {
    name: string,
    password: string
}


const hashpassword = async (password: string): Promise<string> => {
    try {
       return  await bcrypt.hash(password,10)
    } catch (error) {
        console.log(error)
        throw new Error(`hashlenemedi`)


    }
}


export const createdUser = async(userData:IUser)=>{
    try {
        const {name,password} = userData

        const varuser = await User.findOne({name})
        if(varuser){
            throw new Error(`bu kullanici adi kullaniliyor`)
        }

        const hashedPassword = await hashpassword(password)


        const newUser = new User({
            name,
            password:hashedPassword
        })


        return await newUser.save()
    } catch (error) {
        console.log(error)
        throw error
        
    }
}