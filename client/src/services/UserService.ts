import axios from 'axios'
import { User } from '../types/User.type'

export const registerUser = async (user: User) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + '/register', {
        username: user.username,
        password: user.password,
        repeatPassword: user.repeatPassword,
        ytUser: user.ytUser 
    })
    return data
}

export const loginUser = async (user: User) => {
    const { data } = await axios.post(import.meta.env.VITE_API_URL + '/login', {
        username: user.username,
        password: user.password,
    })
    return data
}

export const getUser = async (id: string) => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + `/user/${id}`)

    return data 
}