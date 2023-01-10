import Video from '../models/Video.js'
import { giveOneUser } from './whatUser.js'
import { error } from "../middlewares/error.js";
import { RequestHandler } from 'express';
import User from '../models/User.js'

export const getComments: RequestHandler = async (req, res) => {
    const { comments } = await Video.findOne({_id: req.params.id}) as any

    if (!comments) return error({statusCode: 404, message: 'There are not comments in this video'}, res)
    res.json({success: true, comments: comments})
}


export const createComment: RequestHandler = async (req, res) => {
    const recuperateUser = giveOneUser(req)
    const findUser = await User.findOne({username: recuperateUser.username}) as any
    const video = await Video.findById(req.params.id) as any

    if (!findUser) return error({statusCode: 401, message: 'You must be authenticated before create a comment'}, res)
    if (!video) return error({statusCode: 404, message: 'That video does not exists'}, res)
    
    const comment = {
        comment: req.body.comment,
        userId: findUser._id
    }

    try { 
        const createNewComment = await Video.findByIdAndUpdate(video._id, {$push: {'comments': comment}})
        res.json({success: true, message: 'Comment created successfully'})
    }
    catch {
        error({statusCode: 400, message: 'Error on create the comment'}, res)
    }
}

export const deleteComments: RequestHandler = async (req, res) => {
    const commentId = req.body.id
    const { comments } = await Video.findById(req.params.id) as any
    const recuperateUserName = giveOneUser(req)
    const recuperateUserId = await User.findOne({username: recuperateUserName.username})
   
    if (!recuperateUserId) return error({statusCode: 401, message: 'You must be authenticated to do this action'}, res)
    if (!comments) return error({statusCode: 404, message: 'There are not comments in this video'}, res)

    const ValidArray = (el: any) => {
        return el.userId.equals(recuperateUserId._id) && el._id.toString() === commentId
    }
    const commentsToDelete = comments.filter(ValidArray)

    const commentFound = await Video.findByIdAndUpdate(req.params.id, {$pull: {'comments': commentsToDelete[0]}})
    res.json({success: true, message: '[*] Comment successfully delete'})
}