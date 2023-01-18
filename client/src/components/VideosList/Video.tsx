import React, {useEffect, useState} from 'react'
import { Video } from '../../types/Video.type'
import ReactPlayer from 'react-player'
import { getUser } from '../../services/UserService'

interface Prop {
  video: Video
}

export const VideoComponent = ({video}: Prop) => {
  const [error, setError] = useState<Boolean>(false)
  const [user, setUser] = useState<string>('')

  const loadUser = async () => {
    const data = await getUser(video.userId as string)
    console.log(data)
    setUser(data.username)
  }

  useEffect(() => {
    loadUser()
  })

  return (
    <div className='bg-slate-300 rounded-lg shadow-xl shadow-gray-700'>
      <div className='m-2 p-5'>
        <ReactPlayer className='rounded-lg' url={video.url} />
      </div>
      <div className='text-center'>
        <h1 className='text-6xl font-bold' >
          {video.title}
        </h1>
      </div>
      <div className='flex justify-between p-6 text-xl m-4'>
        <div>
          <span>{video.description}</span>
        </div>
        <div className='p-4 m-4'>
          <span>Video post by: <p className='text-md font-bold text-blue-600'>{user}</p></span>
        </div>
      </div>
      
    </div>
  )
}
