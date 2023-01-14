import React, {ChangeEvent, useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'
import * as jose from 'jose'
import { Video } from '../../types/Video.type'
import { createVideo } from '../../services/VideoService'
import {toast} from 'react-toastify'

export const Form = () => {
    const [jwt, setJwt] = useState<string>('')
    const [cookies, setCookies, removeCookie] = useCookies(['sessionJWT'])
    const [video, setVideo] = useState<Video>({title: '', url: '', description: ''})
    const verifyToken = async (cookie: any) => {
        try { 
          const verifyJWT = await jose.jwtVerify(cookie, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
          if (!verifyJWT) setJwt('')
          setJwt(cookie as string)
        }
        catch {
          setJwt('')
        }
      }
    
    useEffect(() => {
        const cookie = cookies.sessionJWT
        verifyToken(cookie)
    }, [jwt])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVideo({...video, [e.target.name]: e.target.value})
    }

    const handleNewVideo = async (e: any) => {
        e.preventDefault()
        try {
            const data = await createVideo(video, jwt)
            toast.success('Video created successfully')
            console.log(data)
            window.location.href = '/'
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='mt-20 rounded-lg bg-slate-200'>
            <form className='text-center p-12'>
                <span className='text-4xl'>Create a new video</span>
                <div className='m-6 flex justify-center'>
                    <input className='rounded p-2 h-[30px] w-[350px]'
                        onChange={(e) => handleInputChange(e)}
                        type={'text'}
                        name='title'
                        placeholder={'Write a title'}
                    />
                </div>
                <div className='m-6 flex justify-center'>
                    <input className='h-[30px] rounded p-2 w-[350px]'
                        onChange={(e) => handleInputChange(e)}
                        type={'url'}
                        name='url'
                        placeholder={'Write a url'}
                    />
                </div>
                <div className='m-6 flex justify-center'>
                    <textarea name='description' className='rounded p-4 w-[350px]' onChange={(e) => handleInputChange(e)} rows={3} placeholder='Write a description to the video'>
                    </textarea>
                </div>
                <div className='m-6 flex justify-center'>
                    <button className='bg-green-400 p-4 rounded-md' onClick={(e) => handleNewVideo(e)}>Create Video</button>
                </div>
            </form>
        </div>
    )
}
