import Video from '../models/Video.js'
import { giveOneUser } from './whatUser.js'
import { error } from "../middlewares/error.js";
import { RequestHandler } from 'express';
import User from '../models/User.js'

export const getLikes: RequestHandler = async (req, res) => {
    const { likes } = await Video.findOne({_id: req.params.id}) as any

    if (!likes) return error({statusCode: 404, message: 'There are not comments in this video'}, res)
    res.json({success: true, comments: likes})
}


export const createLikes: RequestHandler = async (req, res) => {
    const recuperateUser = giveOneUser(req)
    const findUser = await User.findOne({username: recuperateUser.username}) as any
    const video = await Video.findById(req.params.id) as any

    if (!findUser) return error({statusCode: 401, message: 'You must be authenticated before create a comment'}, res)
    if (!video) return error({statusCode: 404, message: 'That video does not exists'}, res)
    
    const like = {
        userId: findUser._id
    }

    try { 
        const createNewLike = await Video.findByIdAndUpdate(video._id, {$push: {'likes': like}})
        res.json({success: true, message: 'Like created successfully'})
    }
    catch {
        error({statusCode: 400, message: 'Error on create the Like'}, res)
    }
}

export const deleteLike: RequestHandler = async (req, res) => {
    const likeId = req.body.id
    const { likes } = await Video.findById(req.params.id) as any
    const recuperateUserName = giveOneUser(req)
    const recuperateUserId = await User.findOne({username: recuperateUserName.username})
   
    if (!recuperateUserId) return error({statusCode: 401, message: 'You must be authenticated to do this action'}, res)
    if (!likes) return error({statusCode: 404, message: 'There are not likes in this video'}, res)

    const ValidArray = (el: any) => {
        return el.userId.equals(recuperateUserId._id) && el._id.toString() === likeId
    }
    const likesToDelete = likes.filter(ValidArray)

    const likeFound = await Video.findByIdAndUpdate(req.params.id, {$pull: {'likes': likesToDelete[0]}})
    res.json({success: true, message: '[*] like successfully delete'})
}