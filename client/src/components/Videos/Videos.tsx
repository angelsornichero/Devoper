import React, {useEffect, useState} from 'react'
import { getVideos } from '../../services/VideoService'
import { Video } from '../../types/Video.type'
import { VideoComponent } from './Video'


export default  function Videos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  const loadVideos = async () => {
    const videosFounded = await getVideos()
    console.log(videosFounded)
    setVideos(videosFounded.videos)
  }

  useEffect(() => {
    loadVideos()
    setLoading(false)
  }, [])

  return (
    <div className='flex flex-wrap mx-20 my-8 justify-around'>
      {loading ? <h1>Loading</h1> : videos.map((video) => {
        return (
          <div className='flex flex-wrap sm:m-20 m-10 justify-around' key={video._id}>
            <VideoComponent dashboard={false} video={video} />
          </div>
        )
      })}
    </div>
  )
}
