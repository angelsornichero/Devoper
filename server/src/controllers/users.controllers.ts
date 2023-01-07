import { RequestHandler } from "express";
import User from '../models/User.js'
import { error } from "../middlewares/error.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export const registerUser: RequestHandler = async (req, res) => {
    const { username, password, repeatPassword, ytUser } = req.body
    
    const checkUserExists = async () => {
        const findUser = await User.findOne({username: username})
        if (findUser) return true
        const findYtUser = await User.findOne({youtubeUser: ytUser})
        if (findYtUser) return true
        
        return false
    }

    
    if (password !== repeatPassword) return error({statusCode: 401, message: 'The passwords are not the same, please check'}, res)
    if (await checkUserExists() === true) error({statusCode: 401, message: 'User Already exists'}, res)
    
    const encryptPassword = bcrypt.hashSync(password, 8)

    try {
        const createUser = new User({username: username, encryptPassword: encryptPassword, youtubeUser: ytUser})
        const saveUser = await createUser.save()
    }
    catch {
        error({statusCode: 400, message: 'Error on register the User'}, res)
    }

    const createJWT = jwt.sign({username}, process.env.JWT_SECRET as string) 

    res.json({success: true, message: '[*] User correctly created', token: createJWT})

}

export const loginUser: RequestHandler = async (req, res) => {
    const { username, password } = req.body

    const findUser = await User.findOne({username: username})
    if (findUser === null || findUser === undefined) return error({statusCode: 401, message: "User doesn't exists please register first"}, res)
    
    const comparePasswords = bcrypt.compareSync(password, findUser.encryptPassword as string)
    if (comparePasswords === false) return error({statusCode: 401, message: "Password is incorrect"}, res)

    const createJWT = jwt.sign({username}, process.env.JWT_SECRET as string) 

    res.json({success: true, message: '[*] User correctly loged', token: createJWT})
}