import axios from "axios"
import { Video } from "../types/Video.type"



export const getVideos = async () => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + '/videos')
    return data
}

export const createVideo = async (video: Video, jwt: string) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + '/video/create', {
        title: video.title,
        url: video.url,
        description: video.description
    }, {
        headers: {
            authorization: `token ${jwt}`
        }
    })
    return data
}