import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getVideosByUser } from '../../services/VideoService'
import { Video } from '../../types/Video.type'
import { VideoComponent } from '../Videos/Video'

export const UserDashboard = () => {
	const [cookies] = useCookies(['sessionJWT'])
	const [videos, setVideos] = useState<Video[]>([])
	const [reset, setReset] = useState<number>(0)
  
	const getVideos = async () => {
		const data = await getVideosByUser(cookies.sessionJWT as string)
		setVideos(data.videos)
	}


	const handleReset = () => {
		setReset(reset + 1)
	}

	useEffect(() => {
		getVideos()
	}, [reset])

  


	return (
		<div>
			<div className='border-2 border-blue-400 rounded-xl text-center m-10'>
				<h1 className='p-4 text-6xl text-white font-bold' >Control Your Videos</h1>
			</div>
			<div className='flex justify-around flex-wrap'>
				{videos.map((video) => {
					return (
						<div className='m-10' key={video._id}>
							<VideoComponent handleReset={handleReset} video={video} dashboard={true} />
						</div>
					)
				})}
			</div>
		</div>
	)
}
