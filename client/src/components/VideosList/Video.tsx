import React, {useEffect, useState} from 'react'
import { Video } from '../../types/Video.type'
import ReactPlayer from 'react-player'
import { getUser } from '../../services/UserService'
import { deleteVideo, giveLike, deleteLike } from '../../services/VideoService'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { AiFillHeart } from 'react-icons/ai'
import * as jose from 'jose'


interface Prop {
  video: Video,
  dashboard?: boolean
}

export const VideoComponent = ({video, dashboard = false}: Prop) => {
    const [user, setUser] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [jwt, setJwt] = useState<string>('')
    const [like, setLike] = useState<boolean>(false)
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
    const loadLike = async () => {
        const data = await giveLike(video._id as string, jwt as string)
        console.log(data)
    }
    const loadDisLike = async (likeId: string) => {
      const data = await deleteLike(video._id as string, jwt, likeId)
      console.log(data)
    }
    
    const videoIsLiked =  () => {
      const likeOfUser = video.likes?.filter(el => el.userId.toString() === userId)
      const likeBox = document.querySelector(`#like${video._id}`)
      if (!likeOfUser) return
      if (likeOfUser.length > 0) {
        setLike(true)
        likeBox?.classList.add('text-red-600')
      }
    }

    useEffect(() => {
      loadUser()
      loadId()
      videoIsLiked()
    })


    const handleLike = async () => {
      const id = await loadId()
      const likeOfUser = video.likes?.filter(el => el.userId.toString() === id)
      if (!likeOfUser) return
      console.log(like)
      if (like === true) {
        loadDisLike(likeOfUser[0]._id.toString())
        window.location.reload()
      }
      if (like === false) {
        loadLike()
        window.location.reload()
      }
    } 

    const handleDelete = async () => {
      const data = await deleteVideo(video._id as string, cookie.sessionJWT as string)
      console.log(data)
    }

    return (
      <div className='bg-blue-400 rounded-lg shadow-xl text-black max-w-[696px] shadow-gray-600'>
        <div className='m-2 p-5'>
          <ReactPlayer className='rounded-lg' url={video.url} />
        </div>
        <div className='text-center'>
          <h1 className='text-6xl font-bold' >
            {video.title}
          </h1>
        </div>
        <div className='flex justify-between mx-6'>
          <div className='flex justify-center gap-4'>
            <button onClick={handleLike}><AiFillHeart id={`like${video._id}`} className='cursor-pointer text-4xl' /></button>
            <span className='text-3xl'>{video.likes?.length}</span>
          </div>
          <div className='flex justify-center gap-4'>
            <span className='text-3xl'>Comments: {video.comments?.length}</span>
          </div>
          
        </div>
        <div className='flex justify-between p-6 text-xl '>
          <div>
            <span>{video.description}</span>
          </div>
          <div className='p-4 m-4'>
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
