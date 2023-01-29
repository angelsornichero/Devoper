import React, { useEffect, useState } from 'react'
import useUserHistory from '../../hooks/useUserHistory'
import { VideoComponent } from '../Videos/Video'
import { Video } from '../../types/Video.type'

export const History = () => {
	const { getHistory } = useUserHistory()
	const [reset, setReset] = useState<number>(0)
	const [videos, setVideos] = useState<Video[]>([])
	useEffect(() => {
		setVideos(getHistory())
	}, [reset])
    
  
	return (
		<>
			<h1 className='text-center text-8xl border-4 mx-[100px] my-[50px] text-white rounded-xl border-blue-600'>Historial of videos</h1>
			<div className='flex flex-wrap mx-20 my-8 justify-around'>
				{
					videos.map((video) => {
						return (
							<div key={video._id}>
								<VideoComponent history={true} reset={reset} setReset={setReset} video={video} />
							</div>
						)
					})
				}
			</div>
		</>
	)
}
