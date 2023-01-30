import React from 'react'
import { Like } from '../../Like/Like'
import { AiFillHeart } from 'react-icons/ai'
import { Video } from '../../../types/Video.type'

interface Props {
    jwt: string,
    handleReset: any,
    userId: string,
    video: Video
}

export const VideoCommentsLike = ({jwt, handleReset, userId, video}: Props) => {
	return (
		<div className='flex justify-between mt-2 mx-6'>
			<div className='flex justify-center gap-4'>
				{ 
					jwt ? <Like handleReset={handleReset} jwt={jwt} userId={userId} video={video} /> : <AiFillHeart id={`like${video._id}`} className='text-4xl' />
				}
                    
				<span className='text-2xl sm:text-3xl'>{video.likes?.length}</span>
			</div>
			<div className='flex justify-center gap-4'>
				<span className='text-2xl sm:text-3xl'>Comments: {video.comments?.length}</span>
			</div>
		</div>
	)
}
