import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

// Define the type of error expected (extends the built-in Error)
interface ErrorWithStatusCode extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

const globalErrorHandler = (
    err: ErrorWithStatusCode,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Global error handler invoked:", err);

    if (err instanceof AppError) {
        // Handle custom errors
        return res.status(err.statusCode || 500).json({
            error: err.message, // Use err.message instead of the entire err object
        });
    }

    // Handle unexpected errors
    res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
    });
};

export default globalErrorHandler;
