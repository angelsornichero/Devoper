import React from 'react'



export const LastSearches = () => {
	const lastSearchesUser = () => {
		try {
			return JSON.parse(localStorage.getItem('lastSearches') as string).slice(-5) 
		} catch {
			return 'No searches yet'
		}
		
	}

	const lastSearches = lastSearchesUser()
		
	
	

	return (
		<div className='flex justify-around lg:mx-80'>
			{
				typeof lastSearches === 'string'
					? <h1 className='bg-blue-700 px-8 py-4 rounded-full text-white hover:bg-white hover:text-blue-700 border-2 border-blue-700'>No searches yet</h1>
					: lastSearches.map((search: string, index: number) => {
						return (
							<a className={
								index === 0 ? 'bg-blue-700 px-8 py-4 rounded-full text-white hover:bg-white hover:text-blue-700 border-2 border-blue-700' :
									index === 1 ? 'bg-green-700 px-8 py-4 rounded-full text-white hover:bg-white hover:text-green-700 border-2 border-green-700' : 
										index === 2 ? 'bg-yellow-500 px-8 py-4 rounded-full text-white hover:bg-white hover:text-yellow-500 border-2 border-yellow-500' : 
											index === 3 ? 'bg-purple-700 px-8 py-4 rounded-full text-white hover:bg-white hover:text-purple-700 border-2 border-purple-700' : 
												index === 4 ? 'bg-orange-500 px-8 py-4 rounded-full text-white hover:bg-white hover:text-orange-500 border-2 border-orange-500' : ''
							} key={search} href={`/searches/search/${search}`}>
								{search}
							</a>
						)
					})
						
			
			}
		</div>
	)
}
