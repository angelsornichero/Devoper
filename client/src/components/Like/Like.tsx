import { useState, useEffect } from 'react'
import { Video } from '../../types/Video.type'
import { giveLike, deleteLike,  } from '../../services/VideoService'
import { AiFillHeart } from 'react-icons/ai'
import { jwtVerify } from 'jose'

interface Props {
    video: Video,
    jwt: string,
    userId: string,
    setReset: any,
    reset: any
}

export const Like = ({video, jwt, userId, setReset, reset }: Props) => {
    const [like, setLike] = useState<boolean>(false)
    

    const loadLike = async () => {
      const data = await giveLike(video?._id as string, jwt as string)
      // console.log(data)
      
      const likeBox = document.querySelector(`#like${video?._id}`)
      likeBox?.classList.add('text-red-600')
      likeBox?.classList.remove('text-black')
      setReset(reset += 1)
    }
    const loadDisLike = async (likeId: string) => {
      const data = await deleteLike(video?._id as string, jwt as string, likeId)
      setLike(false)
      const likeBox = document.querySelector(`#like${video?._id}`) 
      console.log(likeBox?.classList)
      likeBox?.classList.add('text-black')
      setReset(reset += 1)
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
        
        if (like === true && likeOfUser[0]) {
          await loadDisLike(likeOfUser[0]._id.toString())
        } else if (!likeOfUser[0] && like === true) {
          loadLike()
          setLike(true)
        } 
        if (like === false) {
          loadLike()
          setLike(true)
        }
      }

    useEffect(() => {
      videoIsLiked()
    }, [reset])
   
    return (

    <div>
      <button onClick={handleLike}>
        <AiFillHeart id={`like${video._id}`} className='cursor-pointer text-2xl sm:text-4xl' /> 
      </button>
    </div>
    
    
  )
}
