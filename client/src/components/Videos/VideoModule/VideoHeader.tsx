import React from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

interface Props {
    url: string,
    title: string,
    id: string
}

export const VideoHeader = ({ url, title, id }: Props) => {
	return (
		<Link to={`/video/${id}`} className='sm:p-4 text-center'>
			<div className='sm:w-[696px] sm:h-[450px] w-[375px] h-[250px]  sm:p-5 p-2'>
				<ReactPlayer controls={false} width='100%' height='100%' className='rounded-lg w-4 h-6' url={url} />
			</div>
			
			<h1 className='text-4xl sm:text-6xl font-bold' >
				{title}
			</h1>
			
		</Link>
	)
}
