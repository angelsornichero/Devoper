import React from 'react'
import { Video } from '../../types/Video.type'
import { VideoHeader } from './VideoModule/VideoHeader'
import { VideoFooter } from './VideoModule/VideoFooter'
import useAuthorization from '../../hooks/useAuthorization'
import { VideoCommentsLike } from './VideoModule/VideoCommentsLike'

interface Prop {
  video: Video,
  dashboard?: boolean,
  handleReset: any,
  history?: boolean
}

export const VideoComponent = ({video, dashboard = false, handleReset, history = false}: Prop) => {
	const { userId, jwt } = useAuthorization()
	return (
      
		<div className='bg-blue-400 rounded-lg shadow-xl text-black sm:max-w-[696px] shadow-gray-600'>
			<VideoHeader url={video.url} title={video.title} id={video._id as string} />
			{
				history
					? <div></div>
					: (
						<VideoCommentsLike video={video} userId={userId} handleReset={handleReset} jwt={jwt as string} />
					)
			}
			<VideoFooter jwt={jwt as string} video={video} handleReset={handleReset} dashboard={dashboard} />
		</div>
	)
}
