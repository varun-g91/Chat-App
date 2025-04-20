import jwt from 'jsonwebtoken';
// In /backend/src/utils/generateToken.ts
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    if (!token) {
        // Consider throwing an error for better handling upstream
        console.error("Failed to generate JWT token.");
        throw new Error("Token generation failed");
    }
    const isProduction = process.env.NODE_ENV !== 'development';
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction, // true in production, false in dev
        sameSite: isProduction ? 'none' : 'lax', // 'none' (requires secure) in prod, 'lax' in dev
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        path: '/', // Explicitly set path to root
        // domain: isProduction ? 'your-production-domain.com' : undefined // Optional: Set domain for production if needed
    };
    console.log("Setting cookie 'jwt' with options:", cookieOptions); // Add logging
    res.cookie('jwt', token, cookieOptions);
    return token; // Returning token might be useful
};
