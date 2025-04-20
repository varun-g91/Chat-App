import bcryptjs from "bcryptjs";
import prisma from '../db/prisma.js';
import { generateToken } from '../utils/generateToken.js';
export const signup = async (req, res, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName ||
            !username ||
            !password ||
            !confirmPassword ||
            !gender) {
            res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await prisma.user?.findUnique({ where: { username } });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const genderNormalized = gender.toLowerCase();
        console.log(genderNormalized);
        const malePlaceholderImage = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femalePlaceholderImage = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profileImage = genderNormalized === "male"
            ? malePlaceholderImage
            : femalePlaceholderImage;
        const newUser = await prisma.user?.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender: genderNormalized,
                profileImage,
            },
        });
        if (newUser) {
            generateToken(newUser?.id, res);
            res.status(201).json({
                id: newUser?.id,
                username: newUser?.username,
                fullName: newUser?.fullName,
                profileImage: newUser?.profileImage,
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.error("error in signup controller", error.message);
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "All fields are required" });
        }
        const user = await prisma.user?.findUnique({ where: { username } });
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" });
        }
        generateToken(user.id, res);
        res.status(200).json({
            id: user?.id,
            username: user?.username,
            fullName: user?.fullName,
            profileImage: user?.profileImage,
        });
    }
    catch (error) {
        console.error("error in login controller", error.message);
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("error in logout controller", error.message);
        next(error);
    }
};
export const getAuthenticatedUser = async (req, res, next) => {
    try {
        const user = await prisma.user?.findUnique({
            where: {
                id: req.user?.id,
            }
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            id: user?.id,
            username: user?.username,
            fullName: user?.fullName,
            profileImage: user?.profileImage,
        });
    }
    catch (error) {
        console.error("error in getAuthenticatedUser controller", error.message);
        next(error);
    }
};
