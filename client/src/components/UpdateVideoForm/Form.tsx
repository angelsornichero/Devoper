import React, { useState, useEffect, ChangeEvent } from 'react'
import { useCookies } from 'react-cookie'
import { Video } from '../../types/Video.type'
import * as jose from 'jose'
import { updateVideo, getVideoById } from '../../services/VideoService'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export const Form = () => {
    const [jwt, setJwt] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [cookies, setCookies, removeCookie] = useCookies(['sessionJWT'])
    const [video, setVideo] = useState<Video>({title: '', url: '', description: ''})
    const { id } = useParams()
    
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
    
      const verifyId = async () => {
        const validate = await getVideoById(id as string)
        if (!validate) window.location.href = '/dashboard' 
        console.log(validate, validate.response, typeof validate)
      }
    
    useEffect(() => {
        const cookie = cookies.sessionJWT
        verifyToken(cookie)
        verifyId()
    }, [jwt])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVideo({...video, [e.target.name]: e.target.value})
    }

    const handleUpdateVideo = async (e: any) => {
        e.preventDefault()

        if (video.url.includes('https://www.youtube.com/watch?v=') === false) return setError('[!] You must put an url of youtube') 

        try {
            const data = await updateVideo(id as string, jwt, video)
            toast.success('Video updated successfully')
            console.log(data)
            window.location.href = '/'
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='mt-20 rounded-lg bg-slate-200'>
            {error === '' ? <div></div> : <div className='bg-red-600 text-xl rounded-lg'><h1 className='p-4'>{error}</h1></div>}
            <form className='text-center p-12'>
                <span className='text-4xl'>Update video</span>
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
                    <button className='bg-green-400 p-4 rounded-md' onClick={(e) => handleUpdateVideo(e)}>Update Video</button>
                </div>
            </form>
        </div>
    )
}
