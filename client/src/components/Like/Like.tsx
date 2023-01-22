import React, { useState, useEffect } from 'react'
import { Video } from '../../types/Video.type'
import { giveLike, deleteLike,  } from '../../services/VideoService'
import { AiFillHeart } from 'react-icons/ai'
import * as jose from 'jose'
import { useCookies } from 'react-cookie'

interface Props {
    video: Video,
    jwt: string,
    userId: string,
    id: string
}

export const Like = ({video, jwt, userId, id}: Props) => {
    const [like, setLike] = useState<boolean>(false)
    

    const loadLike = async () => {
        const data = await giveLike(video?._id as string, jwt as string)
    }
    const loadDisLike = async (likeId: string) => {
      const data = await deleteLike(video?._id as string, jwt as string, likeId)
    }
    
    const videoIsLiked =  () => {
      const likeOfUser = video?.likes?.filter(el => el.userId.toString() === userId)
      const likeBox = document.querySelector(`#like${video?._id}`)
      if (!likeOfUser) return
      if (likeOfUser.length > 0) {
        setLike(true)
        likeBox?.classList.add('text-red-600')
      }
    }

    const handleLike = async () => {
        
        const likeOfUser = video?.likes?.filter(el => el.userId.toString() === userId)
        if (!likeOfUser) return
        
        if (like === true) {
          loadDisLike(likeOfUser[0]._id.toString())
          window.location.reload()
        }
        if (like === false) {
          loadLike()
          window.location.reload()
        }
      }

    useEffect(() => {
        videoIsLiked()
    })
   
    return (
    
    <button  onClick={handleLike}><AiFillHeart id={`like${video._id}`} className='cursor-pointer text-2xl sm:text-4xl' /></button>
    
  )
}
