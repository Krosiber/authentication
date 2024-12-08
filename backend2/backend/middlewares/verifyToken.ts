import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
interface User {
    name: string,
    password: String
}
declare global {
    namespace Express {
        interface Request {
            user?: User; // Burada User, sizin kullanıcı modelinize karşılık gelmeli
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'

    if (!token) {
        return 
    }

    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Geçersiz token.' });
        }
        req.user = decoded as User; // Token geçerliyse kullanıcı bilgilerini ekle
        next(); // Token geçerliyse middleware'den geçip devam et
    });
};