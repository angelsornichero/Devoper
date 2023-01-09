import { Request } from "express"
import jwt from 'jsonwebtoken'


export const giveOneUser = (req: Request) => {
    if (!req.headers.authorization) return
    const token = req.headers.authorization.replace('token ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
    console.log(decoded, 'dad')
    return decoded
} 