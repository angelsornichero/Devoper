import { Response } from "express"

interface Error {
    statusCode: number,
    message: string
}

export const error = (err: Error, res: Response) => {
    res.status(err.statusCode || 404).json({success: false, message: `[!] ${err.message}`})
}