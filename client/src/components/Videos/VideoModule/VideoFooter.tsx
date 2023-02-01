import React from 'react'
import { Video } from '../../../types/Video.type'
import { deleteVideo } from '../../../services/VideoService'
import { Link } from 'react-router-dom'

interface Props {
    dashboard: boolean,
    video: Video,
    jwt: string
}

export const VideoFooter = ({ video, dashboard, jwt }: Props) => {
	const handleDelete = async () => {
		const data = await deleteVideo(video._id as string, jwt as string)
		window.location.reload()
		console.log(data)
	}

	const handleModal = () => {
		const modal = document.querySelector('#modal2') as any
		modal.showModal()
	}

	const closeModal = () => {
		const modal = document.querySelector('#modal2') as any
		modal.close()
	}
	return (
		<div className='flex justify-between p-2 lg:text-xl sm:p-6 '>
			<div>
				<span>{video.description}</span>
			</div>
			<div className='p-2 m-2 sm:m-4 sm:p-4'>
				<span>Video post by: <p className='text-md font-bold text-blue-600'>{video.undefined}</p></span>
				<span>Created at: <p className='text-blue-800'>{video.createdAt?.split('T')[0]}</p></span>
				<span>Area: <p className='text-blue-700'>{video.area || 'All'}</p></span>
				{dashboard === true ? 
					(
						<>
							<div className='mt-4'>
								<button onClick={handleModal} className='bg-red-600 p-4 rounded-lg'>Delete video</button>
								<Link className='bg-green-600 m-3 p-4 rounded-lg' to={`/videos/update/${video._id}`}>Update video</Link>
							</div>
							<dialog className='bg-gray-700 rounded-xl' id='modal2'>
								<div  className='p-6 text-white text-4xl'>
									<h1>Are you sure of delete this video?</h1>
								</div>
								<div className='flex justify-center gap-6 m-6 '>
									<button onClick={handleDelete} className='bg-red-600 lg:p-4 rounded-lg'>Delete video</button>
									<button onClick={closeModal} className='bg-blue-600  lg:p-4 rounded-lg'>Close</button>
								</div>
									
							</dialog>
						</>
					) 
					: <div></div> }
			</div>
		</div>
	)
}
