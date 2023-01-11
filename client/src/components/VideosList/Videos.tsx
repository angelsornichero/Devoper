import React, {useEffect, useState} from 'react'
import axios from 'axios'

interface Video {
  title: string,
  url: string,
  description: string,
  createdAt: string,
  _id: string,
  updatedAt: string,
  comments: Array<any>,
  likes: Array<any>
}

export default  function Videos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const getVideos = async () => {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + '/videos')
    console.log(data)
    setVideos(data.videos)
    setLoading(false)
  }
  useEffect(() => {
    getVideos()
  }, [])
  return (
    <div>
      {loading ? <h1>Loading</h1> : videos.map(({title, url, _id}) => {
        return (
          <div key={_id}>
            <h1>
              {title}
            </h1>
            <span>{url}</span>
          </div>
        )
      })}
    </div>
  )
}
