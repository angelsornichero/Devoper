import React, {useEffect, useState} from 'react'
import useVideos from '../../hooks/useVideos'
import { VideoComponent } from './Video'


export default  function Videos() {
 const { loading, videos } = useVideos({keyword: '-'})

  return (
    <div>
      <h1 className='text-center text-8xl border-4 mx-[100px] my-[50px] text-white rounded-xl border-blue-600'>Trends</h1>
      <div className='flex flex-wrap mx-20 my-8 justify-around'>
        {loading ? <h1>Loading</h1> : videos.map((video) => {
          return (
            <div className='flex flex-wrap sm:m-20 m-10 justify-around' key={video._id}>
              <VideoComponent dashboard={false} video={video} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
