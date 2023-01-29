import React, {useEffect, useState } from 'react'
import { Video } from '../../types/Video.type'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { getUser } from '../../services/UserService'
import { getVideoById } from '../../services/VideoService'
import { Comments } from '../Commentaries/Comments'
import { Like } from '../Like/Like'
import useAuthorization from '../../hooks/useAuthorization'
import { CommentaryFrom } from '../Commentaries/CommentaryFrom'
import useUserHistory from '../../hooks/useUserHistory'

export const VideoInterface = () => {
	const { userId, jwt } = useAuthorization()
	const [video, setVideo] = useState<Video>()
	const [error, setError] = useState<boolean>(false)
	const [user, setUser] = useState<string>('')
	const [reset, setReset] = useState<number>(0)
	const { id } = useParams()
	const { addVideoToHistory } = useUserHistory()

	
	const loadVideo = async () => {
		const videoFound = await getVideoById(id as string)
		if (!videoFound) return setError(true)
		setVideo(videoFound.video)
		addVideoToHistory(videoFound.video)   
	}

	const loadUserId = async () => {
		const videoFound = await getVideoById(id as string)
		if (!videoFound) return
		const data = await getUser(videoFound.video.userId.toString())
		setUser(data.username)
	}

	const handleReset = () => {
		setReset(reset + 1)
	}

	useEffect(() => {
		loadVideo()
		loadUserId()
	}, [reset])

	return (
		<div>
			{
				error 
					? (
						<div className='p-4 bg-red-600 rounded-lg'>
							<h1>Error on load video, probably video doesnt exists</h1>
						</div>
					)
					: <></>
			}
			{
				video
					? (
						<div className='w-screen'>
							<h1 className='text-center text-6xl lg:text-9xl mt-4 text-white font-bold'>{video.title}</h1>
							<div className='mx-auto sm:mx-16 my-8 flex justify-center rounded-lg h-[200px] w-[396px] md:w-[700px] md:h-[400px] lg:h-[800px] 2xl:w-[1800px]'>
								<ReactPlayer controls={false} width={'100%'} height={'100%'} className='' url={video.url} />
							</div>
							<div className='mx-16 flex justify-between bg-white rounded-xl'>
								<span className='p-4 text-lg sm:text-3xl flex gap-4'>Video posted by:<p className='text-blue-600'> {user}</p></span>
								<div className='flex p-4 gap-2'>
									{ 
										jwt ? <Like handleReset={handleReset} jwt={jwt as string} video={video as Video} userId={userId as string} /> 
											: <div></div>
									}
									<span className='text-3xl'>{video.likes?.length}</span>
								</div>
							</div>
							<div className='m-10 border-blue-600 mx-10 border-2 rounded-xl text-center'>
								<h1 className='text-2xl sm:text-6xl text-white font-bold p-4'>Comments</h1>
							</div>
							{
								jwt
									? (
										<CommentaryFrom userId={userId as string} jwt={jwt as string} id={id as string}  />
									)
									: <div></div>
							}
							<Comments idVideo={id as string}  />
						</div>
					)
					:   <div></div>
			}
		</div>
	)
}
