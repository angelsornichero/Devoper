import React, { useEffect, useState } from 'react'
import { getComments } from '../../services/VideoService'
import { Comment } from '../../types/Comment.type'

interface Props {
    idVideo: string
}

export const Comments = ({idVideo}: Props) => {
	const [load, setLoad] = useState<boolean>(true)
	const [comments, setComments] = useState<Comment[]>([])

	const loadComments = async () => {
		const data = await getComments(idVideo as string)
		setComments(data.comments)
		setLoad(false)
	}
	useEffect(() => {
		loadComments()
	}, [])

	return (
		<div>
			{ 
				load ? <h1>Loading</h1>
					: (
						comments.map((comment: any) => {
							return ( 
								<div className='flex justify-between bg-blue-600 text-white m-5 mx-20' key={comment.id}>
									<span className='text-sm sm:text-xl p-4'>{comment.comment}</span>
									<span className='text-xl p-4 underline'>{comment.username}</span>
								</div>
							)
						})
					)
			}
		</div>
	)
}
