import {Request,Response} from "express"
import {createUser} from "../services/authService"


export const registerUser = async(req:Request,res:Response)=>{
    const {username,password} = req.body

    if(!username ||  !password ){
        return res.status(400).json({message:`Tum alanlari doldurunuz`})
    }

    try {
        const newUser = await createUser({username,password})
        res.status(201).json({succes:`basariyla olusturuldu`,user:newUser})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:`Sunucu hatasi!`})
        
    }
}


