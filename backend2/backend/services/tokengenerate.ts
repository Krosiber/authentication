import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface UserPayload {
    name: string;

}

export const generateAccessToken = (user: UserPayload): string => {
    return jwt.sign(user, env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
};

export const generateRefreshToken = (user: UserPayload): string => {
    return jwt.sign(user, env.REFRESH_TOKEN_SECRET, { expiresIn: '2m' });
};

export const refreshTokens = new Map<string, UserPayload>();
