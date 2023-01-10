import { error } from "./error.js"
import jwt from 'jsonwebtoken'
import { RequestHandler } from "express"



export const isAuthenticated: RequestHandler = (req, res, next) => {
    console.log(req.body)
    if (!req.headers.authorization) return error({statusCode: 401, message: '[!] You have to put a header of authorization'}, res)
    const token = req.headers.authorization.replace('token ', '')
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        
    }
    catch(err) {
        error({statusCode: 401, message: '[!] The token is invalid'}, res)
        
    }
    
    return next()
}

