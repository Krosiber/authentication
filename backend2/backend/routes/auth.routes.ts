import express,{Request,Response} from "express";
import { login, registerUser} from "../controllers/auth.controller"
import {verifyToken} from "../middlewares/verifyToken"
const router = express.Router()


router.post(`/register`, registerUser)
router.post(`/login`,login)

router.get('/verify-token', verifyToken, (req: Request, res: Response) => {
    // Eğer token geçerliyse, req.user içindeki kullanıcıyı döndür
    if (req.user) {
        res.json(req.user); // Eğer token geçerli ve user bulunuyorsa, kullanıcıyı döndür
    } else {
        res.status(401).json({ message: 'Geçersiz token' });
    }
});
export default router


