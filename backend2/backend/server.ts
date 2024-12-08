import express from "express";

import cors from "cors"
import "dotenv/config"
import auth from "./routes/auth.routes"
import { connectDb } from "./config/mongoose"
import env from "./config/env";
//import protectRoute from "./middlewares/authMiddleware";
const app = express()
app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}))
app.use(express.json())
app.use(`/auth`, auth)




const PORT = env.PORT
app.listen(PORT, () => {
    console.log(`port dinleniyor`)
})
connectDb()

