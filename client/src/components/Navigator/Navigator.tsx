import React, { useEffect, useState } from 'react'

export const Navigator = () => {
	return (
		<div className='flex justify-center mt-8'>
			<form className='flex gap-5 bg-white p-4'>
				<input className='h-10 w-64 rounded-lg bg-blue-400' />
				<button className='bg-green-600 px-4 rounded-lg'>Search</button>
			</form>
		</div>
	)
}
