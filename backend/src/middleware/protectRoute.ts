import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.js';
import prisma from '../db/prisma.js';

interface DecodedToken extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
            }
        }
    }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return next(new AppError('You are not logged in', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded) {
            return next(new AppError('Invalid token', 401));
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true, fullName: true, profileImage: true } });

        if (!user) {
            return next(new AppError('User not found', 401));
        }

        req.user = user;
        
        next(); 
    } catch (error: any) {
        console.log("error in protectRoute middleware", error);
        next(error);
    }
}

export default protectRoute;