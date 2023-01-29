import React, { useState, useEffect, ChangeEvent } from 'react'
import { useCookies } from 'react-cookie'
import { Video } from '../../types/Video.type'
import * as jose from 'jose'
import { updateVideo, getVideoById } from '../../services/VideoService'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import useAuthorization from '../../hooks/useAuthorization'

export const Form = () => {
	const { jwt } = useAuthorization()
	const [error, setError] = useState<string>('')
	const [video, setVideo] = useState<Video>({title: '', url: '', description: '', area: 'All'})
	const { id } = useParams()
    
	const verifyId = async () => {
		const validate = await getVideoById(id as string)
		if (!validate) window.location.href = '/dashboard' 
		console.log(validate, validate.response, typeof validate)
	}
    
	useEffect(() => {
		verifyId()
	}, [jwt])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setVideo({...video, [e.target.name]: e.target.value})
	}

	const handleUpdateVideo = async (e: any) => {
		e.preventDefault()

		// if (video.url.includes('https://www.youtube.com/watch?v=') === false) return setError('[!] You must put an url of youtube') 

		try {
			const data = await updateVideo(id as string, jwt as string, video)
			toast.success('Video updated successfully')
			console.log(data)
			window.location.href = '/'
		}
		catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='mt-20 rounded-lg bg-slate-200'>
			{error === '' ? <div></div> : <div className='bg-red-600 text-xl rounded-lg'><h1 className='p-4'>{error}</h1></div>}
			<form className='text-center p-2 sm:p-12'>
				<span className='text-4xl'>Update video</span>
				<div className='m-6 flex justify-center'>
					<input className='rounded p-2 h-[30px] w-[350px]'
						onChange={(e) => handleInputChange(e)}
						type={'text'}
						name='title'
						placeholder={'Write a title'}
					/>
				</div>
				<div className='m-6 flex justify-center'>
					<input className='h-[30px] rounded p-2 w-[350px]'
						onChange={(e) => handleInputChange(e)}
						type={'url'}
						name='url'
						placeholder={'Write a url'}
					/>
				</div>
				<div className='m-6 flex justify-center'>
					<textarea name='description' className='rounded p-4 w-[350px]' onChange={(e) => handleInputChange(e)} rows={3} placeholder='Write a description to the video'>
					</textarea>
				</div>
				<div className='flex justify-between'>
					<span className='text-lg'>Select the programation area</span>
					<select onChange={handleInputChange} name="area">
						<option value={'All'}>All</option>
						<option value={'Backend'}>Backend</option>
						<option value={'Frontend'}>Frontend</option>
						<option value={'Data Science'}>Data science</option>
						<option value={'Machine Learning'}>Machine Learning</option>
						<option value={'Database'}>Database</option>
						<option value={'Mobile'}>Mobile</option>
					</select>
                    
				</div>
				<div className='m-6 flex justify-center'>
					<button className='bg-green-400 p-4 rounded-md' onClick={(e) => handleUpdateVideo(e)}>Update Video</button>
				</div>
			</form>
		</div>
	)
}
