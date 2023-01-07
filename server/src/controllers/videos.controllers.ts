import { RequestHandler } from "express";
import Video from '../models/Video.js'
import { error } from "../middlewares/error.js";
import User from '../models/User.js'

export const getVideos: RequestHandler = async (req, res) => {
    const videos = await Video.find()
    if (!videos) error({statusCode: 404, message: 'Any video founded'}, res)
    res.json({success: true, videos: `[*] ${videos}`})
}

export const createVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findOne({url: req.body.url})
    if (videoFound) {
        error({statusCode: 301, message: 'The video already exists please change the URL'}, res)
        return
    }
    const findUser = await User.findOne({username: req.body.username})
    if (!findUser) {
        error({statusCode: 301, message: 'This user no exists please create one'}, res)
        return
    }
    try {
        const createNewVideo = new Video({title: req.body.title, description: req.body.description, url: req.body.url, userId: findUser})
        const savedVideo = await createNewVideo.save()
        res.json({ success: true, message: '[*] Video succesfully created' })
    }
    catch {
        error({statusCode: 400, message: 'Error on create and save the video'}, res)
    }
    
}

export const getVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findById(req.params.id)
    if (!videoFound) return error({statusCode: 204, message: `Any video with id: ${req.params.id} found`}, res)
    res.json({ success: true, video: `[*] ${videoFound}` })
}

export const updateVideo: RequestHandler = async (req, res) => {
    const videoUpdated = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!videoUpdated) return error({statusCode: 204, message: `Any video with id: ${req.params.id} found`}, res)
    res.json({success: true, newVideo: `[*] ${videoUpdated}`})
}

export const deleteVideo: RequestHandler =  async (req, res) => {
    const videoFound = await Video.findByIdAndDelete(req.params.id)
    if (!videoFound) return error({statusCode: 204, message: `Any video with id: ${req.params.id} found`}, res)
    res.json({ success: true, video: `[*] ${videoFound}` })
}