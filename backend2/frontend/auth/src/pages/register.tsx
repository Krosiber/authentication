import axios from 'axios'
import React, { useState } from 'react'

const register = () => {
    const [username,setUsername] = useState(``)
    const [password,setPassword] = useState(``)

    const send = async(e: React.FormEvent)=>{
        e.preventDefault()
        try {
            const response = axios.post(`http://localhost:4500/api/register`,{username,password})
            console.log(`basarili`,response)
        } catch (error) {
            console.log(error)
            
        }

    }
  return (
    <div>
        <form onSubmit={send}>
            <input type="text" onChange={(e)=>{setUsername(e.target.value)}} />
            <br />
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} />
            <button type='submit'>Gonder</button>
        </form>
      
    </div>
  )
}

export default register
