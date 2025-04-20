import jwt from 'jsonwebtoken';
import { CookieOptions, Response } from 'express';
import { resolve } from 'path';

// In /backend/src/utils/generateToken.ts
export const generateToken = (userId: string, res: Response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '15d',
    });

    if (!token) {
        console.error("Failed to generate JWT token.");
        throw new Error("Token generation failed");
    }

    const isProduction = process.env.NODE_ENV !== 'development';

    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction, 
        sameSite: isProduction ? 'none' : 'lax' as const, 
        maxAge: 15 * 24 * 60 * 60 * 1000, 
        path: '/', 
    };

    console.log("Setting cookie 'jwt' with options:", cookieOptions); 

    res.cookie('jwt', token, cookieOptions);

    return token; 
}
