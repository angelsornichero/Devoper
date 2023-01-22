import React, {useEffect, useState} from 'react'
import { Video } from '../../types/Video.type'
import ReactPlayer from 'react-player'
import { getUser } from '../../services/UserService'
import { deleteVideo } from '../../services/VideoService'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { AiFillHeart } from 'react-icons/ai'
import * as jose from 'jose'
import { Like } from '../Like/Like'

interface Prop {
  video: Video,
  dashboard?: boolean
}

export const VideoComponent = ({video, dashboard = false}: Prop) => {
    const [user, setUser] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [jwt, setJwt] = useState<string>('')
    const [cookie] = useCookies(['sessionJWT'])


    const loadUser = async () => {
      const data = await getUser(video.userId as string)
      console.log(data)
      setUser(data.username)
    }

    const loadId = async () => {
      const { payload } = await jose.jwtVerify(cookie.sessionJWT, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
      setUserId(payload.id as string)
      setJwt(cookie.sessionJWT)
      console.log(payload.id, userId)
      return payload.id
    }

    useEffect(() => {
      loadUser()
      loadId()
    })

    const handleDelete = async () => {
      const data = await deleteVideo(video._id as string, cookie.sessionJWT as string)
      console.log(data)
    }

    return (
      
        <div className='bg-blue-400 rounded-lg shadow-xl text-black sm:max-w-[796px] shadow-gray-600'>
          <div className='sm:w-[696px] sm:h-[450px] w-[375px] h-[250px]  sm:p-5 p-2'>
            <ReactPlayer controls={false} width='100%' height='100%' className='rounded-lg w-4 h-6' url={video.url} />
          </div>
          <Link to={`/video/${video._id}`} className='sm:p-4 text-center'>
            <h1 className='text-4xl sm:text-6xl font-bold' >
              {video.title}
            </h1>
          </Link>
          <div className='flex justify-between mt-2 mx-6'>
            <div className='flex justify-center gap-4'>
              { 
                jwt ? <Like jwt={jwt} userId={userId} video={video} id={video._id as string} /> : <AiFillHeart id={`like${video._id}`} className='text-4xl' />
              }
              
              <span className='text-2xl sm:text-3xl'>{video.likes?.length}</span>
            </div>
            <div className='flex justify-center gap-4'>
              <span className='text-2xl sm:text-3xl'>Comments: {video.comments?.length}</span>
            </div>
          </div>
          <div className='flex justify-between p-2 sm:p-6 text-xl '>
            <div>
              <span>{video.description}</span>
            </div>
            <div className='p-2 m-2 sm:m-4 sm:p-4'>
              <span>Video post by: <p className='text-md font-bold text-blue-600'>{user}</p></span>
              {dashboard === true ? 
                (<div className='mt-4'>
                  <button onClick={handleDelete} className='bg-red-600 p-4 rounded-lg'>Delete video</button>
                  <Link className='bg-green-600 m-3 p-4 rounded-lg' to={`/videos/update/${video._id}`}>Update video</Link>
                </div>) 
                : <div></div>  }
            </div>
          </div>
          
        </div>
    )
}
