import { useState, useEffect } from 'react'
import { getVideos } from '../services/VideoService'
import { Video } from '../types/Video.type'

interface Params {
    keyword: string
}

const useVideos = ({ keyword }: Params) => {
	const [videos, setVideos] = useState<Video[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [reset, setReset] = useState<number>(0)

	const loadVideos = async () => {
		const videosFounded = await getVideos(keyword)
		console.log(videosFounded)
		setVideos(videosFounded.videos.slice(0, 6))
		setLoading(false)
	}

	useEffect(() => {
		loadVideos()
	}, [reset])

	return { loading, videos, reset, setReset }
}

export default useVideos