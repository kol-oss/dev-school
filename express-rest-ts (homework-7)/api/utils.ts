import { Request, Response } from 'express';

function generateError(res: Response, statusCode: number, error: any) {
    res
        .status(statusCode)
        .json({
            error: error,
            message: error.message
        });
}

export {
    generateError
};