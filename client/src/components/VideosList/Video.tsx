import React from 'react'
import { Video } from '../../types/Video.type'

interface Prop {
  video: Video
}

export const VideoComponent = ({video}: Prop) => {
  return (
    <div className='bg-slate-300 rounded-lg '>
      <div className='m-2 p-20'>
        
      </div>
      <div className='m-2 p-20'>
        <h1 className='text-xl' >
          {video.title}
        </h1>
        <span>{video.description}</span>
      </div>
    </div>
  )
}
