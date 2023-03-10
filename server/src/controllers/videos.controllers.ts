import { RequestHandler } from "express";
import Video from '../models/Video.js'
import { error } from "../middlewares/error.js";
import User from '../models/User.js'
import { giveOneUser } from "./whatUser.js";


export const getVideosTendeces: RequestHandler = async (req, res) => {
    const keyword = req.params.keyword === '-' ? '' : req.params.keyword
    const rawVideos = await Video.find()
    console.log(keyword)
    // Here we filter the videos if they includes de keyword
    const videosUnSorted: any[] = rawVideos.filter((el: any) => el.title.toLowerCase().includes(keyword.toLowerCase()))
    
    const videosMapped: any[] = []

    for (let i = 0; i < videosUnSorted.length; i++) {
        const video = videosUnSorted[i]
        const { username } = await User.findById(video.userId.toString()) as any
        videosMapped.push({...video._doc, [video._doc.username]: username})
    }
    // Now lets sort the items
    let videoTendencesByLike: boolean = true
    const videos = videosMapped.sort((a: any, b: any) => {
        const ADate = new Date(a.createdAt)
        const BDate = new Date(b.createdAt)
        if (a.likes.length < b.likes.length && videoTendencesByLike === true) {videoTendencesByLike = false; return 1}
        if (a.likes.length > b.likes.length && videoTendencesByLike === true) {videoTendencesByLike = false; return -1}
        if (ADate > BDate && videoTendencesByLike === false) {
            videoTendencesByLike = true
            return -1
        }
        if (ADate < BDate && videoTendencesByLike === false) {
            videoTendencesByLike = true
            return 1
        }

        videoTendencesByLike = !videoTendencesByLike

        return 0
        
    })
    if (!videos) error({statusCode: 404, message: 'Any video founded'}, res)
    res.json({success: true, videos: videos.slice(0, 500)})
}
export const getVideosByUserId: RequestHandler = async (req, res) => {
    const videos = await Video.find()
    const recuperateUser = giveOneUser(req) 
    const findUser = await User.findOne({username: recuperateUser.username})
    let videoToReturn: Array<any> = []
    
    if (!findUser) return error({statusCode: 401, message: 'User not found'}, res)

    videos.forEach(video => {
        if (video.userId.toString() === findUser._id.toString()) videoToReturn.push(video)
    })
    if (!videoToReturn) error({statusCode: 404, message: 'Any video founded'}, res)
    res.json({success: true, videos: videoToReturn})
}

export const createVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findOne({url: req.body.url})
    if (videoFound) {
        error({statusCode: 301, message: 'The video already exists please change the URL'}, res)
        return
    }
    const recuperateUser = giveOneUser(req) 
    const findUser = await User.findOne({username: recuperateUser.username})

    if (!findUser) return error({statusCode: 401, message: "You have to register before create a video"}, res)

    try {
        const createNewVideo = new Video({title: req.body.title, description: req.body.description, url: req.body.url, userId: findUser, area: req.body.area})
        const savedVideo = await createNewVideo.save()
        res.json({ success: true, message: '[*] Video succesfully created' })
    }
    catch {
        error({statusCode: 400, message: 'Error on create and save the video'}, res)
    }
    
}

export const getVideo: RequestHandler = async (req, res) => {
    try {
        const videoFound = await Video.findById(req.params.id) as any
        if (!videoFound) return error({statusCode: 204, message: `Any video with id: ${req.params.id} found`}, res)
        const { username } = await User.findById(videoFound.userId.toString()) as any
        res.json({ success: true, video: {...videoFound._doc, [videoFound._doc.username]: username }})
    } catch {
        error({statusCode: 404, message: 'No videos with that id'}, res)
    }
    
}

export const updateVideo: RequestHandler = async (req, res) => {
    const recuperateUserName = giveOneUser(req)
    const recuperateUserId = await User.findOne({username: recuperateUserName.username})
    const recuperateVideo = await Video.findById(req.params.id)
    
    if (!recuperateUserId || !recuperateVideo) return error({statusCode: 401, message: 'Error on user authorization'}, res)
    if (!recuperateVideo.userId.equals(recuperateUserId._id)) return error({statusCode: 401, message: 'You cannot modify this video'}, res)
    
    const videoUpdated = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!videoUpdated) return error({statusCode: 204, message: `Any video with id: ${req.params.id} found`}, res)
    res.json({success: true, newVideo: `[*] ${videoUpdated}`})
}

export const deleteVideo: RequestHandler =  async (req, res) => {
    const recuperateUserName = giveOneUser(req)
    const recuperateUserId = await User.findOne({username: recuperateUserName.username})
    const recuperateVideo = await Video.findById(req.params.id)
    
    if (!recuperateUserId || !recuperateVideo) return error({statusCode: 401, message: 'Error on user authorization'}, res)
    if (!recuperateVideo.userId.equals(recuperateUserId._id)) return error({statusCode: 401, message: 'You cannot modify this video'}, res)
    
    const videoFound = await Video.findByIdAndDelete(req.params.id)
    if (!videoFound) return error({statusCode: 204, message: `Any video with id: ${req.params.id} found`}, res)
    res.json({ success: true, video: `[*] ${videoFound}` })
}  