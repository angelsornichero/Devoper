import React, { useState, ChangeEvent } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import useLastSearches from '../../hooks/useLastSearches'


export const Navigator = () => {
	const [toSearch, setSearch] = useState<string>('')
	const { search } = useParams()
	const { addLastKeyword } = useLastSearches()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const submitSearch = (e: any) => {
		e.preventDefault()
		if (toSearch === '') return window.location.href = '/'
		addLastKeyword(toSearch)
		window.location.href = `/search/${toSearch}`
	}

	return (
		<div className='flex justify-center mt-8'>
			<form className='flex gap-5 bg-transparent p-4'>
				<input onChange={handleChange}  name='search' placeholder={search ? `Last Search: ${search}` : 'Search something'} className='h-14 w-[300px] lg:w-[600px] placeholder:italic placeholder:text-white text-white text-3xl rounded-lg bg-blue-400 p-4' />
				<button onClick={submitSearch} className='bg-green-600 p-4 text-3xl rounded-lg'><BiSearchAlt /></button>
			</form>
		</div>
	)
}
