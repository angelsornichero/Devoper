import axios from "axios"

export const getVideos = async () => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + '/videos')
    return data
}
