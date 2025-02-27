class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Identifies operational errors
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
