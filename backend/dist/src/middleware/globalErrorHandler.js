import AppError from "../utils/AppError.js";
const globalErrorHandler = (err, req, res, next) => {
    console.error("Global error handler invoked:", err);
    if (err instanceof AppError) {
        // Handle custom errors
        res.status(err.statusCode || 500).json({
            error: err.message, // Use err.message instead of the entire err object
        });
    }
    // Handle unexpected errors
    res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
    });
};
export default globalErrorHandler;
