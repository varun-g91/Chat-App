import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import prisma from '../db/prisma.js';
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return next(new AppError('You are not logged in', 401));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new AppError('Invalid token', 401));
        }
        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true, fullName: true, profileImage: true } });
        if (!user) {
            return next(new AppError('User not found', 401));
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("error in protectRoute middleware", error);
        next(error);
    }
};
export default protectRoute;
