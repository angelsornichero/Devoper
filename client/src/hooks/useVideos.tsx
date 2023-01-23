import { useState, useEffect } from "react";
import { getVideos } from '../services/VideoService'
import { Video } from '../types/Video.type'

interface Params {
    keyword: string
}

const useVideos = ({ keyword }: Params) => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  const loadVideos = async () => {
    const videosFounded = await getVideos(keyword)
    setVideos(videosFounded.videos.slice(0, 6))
    setLoading(false)
  }

  useEffect(() => {
    loadVideos()
  }, [])

  return { loading, videos }
}

export default useVideos