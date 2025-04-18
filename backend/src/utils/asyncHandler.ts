import { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
