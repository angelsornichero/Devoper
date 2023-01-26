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
    console.log(videosFounded)
    setVideos(videosFounded.videos.slice(0, 6))
    setLoading(false)
  }

  const loadLastKeywords = () => {
    if (keyword === '-') return
    if (!localStorage.getItem('lastSearches')) return localStorage.setItem('lastSearches', JSON.stringify([keyword]))
    const lastSearches = JSON.parse(localStorage.getItem('lastSearches') as string)
    lastSearches.push(keyword)
    localStorage.setItem('lastSearches', JSON.stringify(lastSearches))
  }

  useEffect(() => {
    loadVideos()
  }, [])

  return { loading, videos }
}

export default useVideos