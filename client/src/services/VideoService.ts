import axios from "axios"
import { FaHandLizard } from "react-icons/fa"
import { Video } from "../types/Video.type"
import { getUser } from "./UserService"
import { Comment } from "../types/Comment.type"

export const getVideos = async () => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + '/videos')
    return data
}

export const getVideosByUser = async (token: string) => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + '/videos', {
        headers : {
            authorization: `token ${token}`
        }
    })

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

export const deleteVideo = async (id: string, jwt: string) => {
    const { data } = await axios.delete(import.meta.env.VITE_API_URL + `/video/delete/${id}`, {
        headers: {
            authorization: `token ${jwt}`
        }
    })
    return data
} 

export const updateVideo = async (id: string, jwt: string, video: Video) => {
    const { data } = await axios.put(import.meta.env.VITE_API_URL + `/video/update/${id}`, {
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

export const getVideoById = async (id: string) => {
    try { 
        const { data } = await axios.get(import.meta.env.VITE_API_URL + `/videos/${id}`)
        return data
    } catch {
        return false
    }

}

export const giveLike = async (id: string, jwt: string) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + `/like/create/${id}`, {}, {
        headers: {
            authorization: `token ${jwt}`
        }
    })
    return data
}

export const deleteLike = async (id: string, jwt: string, likeId: string) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + `/like/delete/${id}`, {
        id: likeId
    }, {
        headers: {
            authorization: `token ${jwt}`
        }
    })
    return data
}

export const getComments = async (id: string) => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + `/comments/${id}`)


    return data

}

export const createComment = async (comment: string, jwt: string, id: string) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + `/comment/create/${id}`, {
        comment: comment
    },
    {
        headers: {
            authorization: `token ${jwt}`
        }
    }
    )
    return data
}