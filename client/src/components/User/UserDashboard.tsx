import React, { useEffect, useState } from 'react'
import * as jose from 'jose'
import { useCookies } from 'react-cookie'
import { getVideosByUser } from '../../services/VideoService'
import { Video } from '../../types/Video.type'
import { VideoComponent } from '../VideosList/Video'

export const UserDashboard = () => {
  const [jwt, setJwt] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [cookies, setCookies] = useCookies(['sessionJWT'])
  const [videos, setVideos] = useState<Video[]>([])

  const verifyToken = async (cookie: any) => {
    try { 
      const verifyJWT = await jose.jwtVerify(cookie, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
      if (!verifyJWT) setJwt('')
      console.log(verifyJWT)
      setUsername(verifyJWT.payload.username as any)
      setJwt(cookie)
      return verifyJWT
    }
    catch {
      setJwt('')
    }
  }
  
  const getVideos = async () => {
    const data = await getVideosByUser(jwt)
    console.log(data)
    setVideos(data.videos)
  }

  useEffect(() => {
    const cookie = cookies.sessionJWT
    verifyToken(cookie)
    console.log(cookie, verifyToken(cookie))
    getVideos()
  }, [])

  


  return (
    <div>
        <div className='border-2 border-blue-400 rounded-xl text-center m-10'>
            <h1 className='p-4 text-6xl font-bold' >Control Your Videos</h1>
        </div>
        <div className='flex justify-around flex-wrap'>
            {videos.map((video) => {
                return (
                    <div className='m-10' key={video._id}>
                        <VideoComponent video={video} dashboard={true} />
                    </div>
                )
            })}
        </div>
    </div>
  )
}
