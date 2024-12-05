import express from "express";
import {connectDB} from "./config/mongoose"
import  env  from "./config/env";
import authRoute from "./routes/auth.routes"
import cors from "cors"
const app = express()
const PORT = env.PORT
app.use(cors({
    origin:`*`,
    credentials:true
}))
app.use(express.json())


app.use(`/api`,authRoute)


app.listen(env.PORT,()=>{
    console.log(`${PORT} u dinleniyor`)
})
connectDB()