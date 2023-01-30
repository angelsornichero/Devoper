import React from 'react'
import { Link } from 'react-router-dom'
import { FaSadTear } from 'react-icons/fa'

const NotFoundPage = () => {
	return (
		<>
			<section className='flex text-white justify-center mt-56 gap-4'>
				<h1 className='text-8xl font-bold'>Sorry, Page Not Found</h1><FaSadTear className='text-8xl text-green-500 font-bold' />
			</section>
			<div className='flex text-blue-600 justify-center m-20'>
				<Link className='font-semibold text-5xl underline underline-offset-8' to={'/'}>Go to the Home Page!</Link>
			</div>
		</>
	)
}

export default NotFoundPage