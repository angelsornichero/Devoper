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
	const [page, setPage] = useState<number>(0)
	const [allVideos, setAllVideos] = useState<Video[]>([])


	const loadVideos = async () => {
		if (videos.length === 0) {
			const videosFounded = await getVideos(keyword)
			setAllVideos(videosFounded.videos)
			setVideos(videosFounded.videos.slice(page, page + 6))
			setLoading(false)
			return
		}
		setVideos(videos.concat(allVideos.slice(page, page + 6)))
	}
	useEffect(() => {
		loadVideos()
	}, [reset, page])

	const handleReset = () =>  {
		setReset(reset + 1)
	}

	return { loading, videos, handleReset, setPage, page }
}

export default useVideos