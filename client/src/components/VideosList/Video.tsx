import React from 'react'
import { Video } from '../../types/Video.type'

interface Prop {
  video: Video
}

export const VideoComponent = ({video}: Prop) => {
  return (
    <div className='bg-slate-600 w-40 rounded-lg h-40'>
      <div>
        
      </div>
      <div>
        <h1 className='text-xl' >
          {video.title}
        </h1>
        <span>{video.url}</span>
      </div>
    </div>
  )
}
