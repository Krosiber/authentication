import { Request, Response } from "express";
import { createdUser } from "../services/registerservice"
import { User } from "../models/userModel";
import { generateAccessToken, generateRefreshToken, refreshTokens, UserPayload } from '../services/tokengenerate';
import bcrypt from "bcryptjs"
export const registerUser = async (req: Request, res: Response) => {
    const { name, password } = req.body

    if (!name || !password) {
        console.log(`bu alani doldurunuz`)
    }

    try {
        await createdUser({ name, password })
        res.status(201).json({ message: `register successfull` })
    } catch (error) {
        res.status(500).json({ message: `register not successfull` })

    }
}


export const login = async (req: Request, res: Response): Promise<void> => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
        res.status(400).json({ message: 'Kullanıcı bulunamadı.' });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({ message: 'Şifre yanlış.' });
        return;
    }

    const userPayload: UserPayload = {
        name: user.name
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    refreshTokens.set(refreshToken, userPayload);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 30 * 60 * 1000,
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 10 * 60 * 1000,
    });

    res.json({ accessToken });
};