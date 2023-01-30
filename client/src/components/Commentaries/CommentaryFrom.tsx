import React, { useState } from 'react'
import { Comment } from '../../types/Comment.type'
import { createComment } from '../../services/VideoService'
import { AiOutlineSend } from 'react-icons/ai'

interface Params {
    userId: string, 
    jwt: string, 
    id: string,
	handleReset: any
}

export const CommentaryFrom = ({userId, jwt, id, handleReset}: Params) => {
	const [sendComment, setSendComment] = useState<Comment>({comment: '', userId: userId})
	const handleInputChange = (e: any) => {
		setSendComment({...sendComment, [e.target.name]: e.target.value})
	}
    
	const submitComment = async (e: any) => {
		e.preventDefault()
		console.log(sendComment.comment)
		try {
			const data = await createComment(sendComment.comment, jwt as string, id as string)
			handleReset()
		}
		catch {
			return
		}
	}
	return (
		<div>
			<form className='bg-white flex sm:gap-4 md:rounded-2xl m-6 lg:mx-[400px] p-4 justify-center'>
				<input className='bg-green-700 md:text-2xl text-white p-3 w-96 rounded-xl' type={'text'} name='comment' onChange={handleInputChange} placeholder='Write a comment' />
				<button onClick={submitComment} className='text-4xl text-blue-600'><AiOutlineSend /></button>
			</form>
		</div>
	)
}
