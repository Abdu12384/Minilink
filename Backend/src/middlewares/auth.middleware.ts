import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { HTTP_STATUS } from '../constants/statusCode';
import { ERROR_MESSAGES } from '../constants/message';

export interface AuthRequest extends Request {
    user: {
        id: string;
        email: string;
    };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['x-access-token'];
    if (!token) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: ERROR_MESSAGES.TOKEN_MISSING
        });
        return;
    }

    try {
        const decoded = verifyAccessToken(token);
        (req as AuthRequest).user = decoded;
        next();
    } catch (error) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: 'Invalid token'
        });
        return;
    }
};