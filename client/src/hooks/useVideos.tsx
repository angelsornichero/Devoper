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
		const videosFounded = await getVideos(keyword)
		console.log(videosFounded)
		setAllVideos(videosFounded.videos)
		setVideos(videosFounded.videos.slice(0, page + 4))
		setLoading(false)
		return
	}
	useEffect(() => {
		loadVideos()
	}, [reset])

	useEffect(() => {
		setVideos(videos.concat(allVideos.slice(page, page + 4)))
	}, [page])

	const handleReset = () =>  {
		setReset(reset + 1)
	}

	return { loading, videos, handleReset, setPage, page }
}

export default useVideos