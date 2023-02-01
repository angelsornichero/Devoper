import React, {useRef, LegacyRef, useEffect, useCallback} from 'react'
import useVideos from '../../hooks/useVideos'
import { VideoComponent } from './Video'
import { useParams } from 'react-router-dom'
import useNearScreen from '../../hooks/useNearScreen'
import debounce from 'just-debounce-it'
import Spinner from '../Spinner/Spinner'

export default function Videos() {
	const {search} = useParams()
	const externalRef = useRef<LegacyRef<HTMLDivElement>>()
	const { loading, videos, handleReset, setPage, page } = useVideos({keyword: search ? search : '-'})
	const {isNearScreen} = useNearScreen({externalRef: loading ? null : externalRef, once: false})


	const HandlePage = useCallback(debounce(() => {setPage(page + 4); console.log('next page')}, 20), [])
	
	useEffect(() => {
		if (isNearScreen) HandlePage()
		// console.log(videos)
	})

	return (
		<div>
			<h1 className='text-center text-5xl lg:text-8xl border-4 mx-[100px] my-[50px] text-white rounded-xl border-blue-600'>{search ? `Trends of ${search}` : 'Trends'}</h1>
			<div className='flex flex-wrap mx-20 my-8 justify-around'>
				{loading ? <Spinner /> : videos.map((video) => {
					return (
						<div className='flex flex-wrap sm:m-20 m-10 justify-around' key={video._id}>
							<VideoComponent handleReset={handleReset} dashboard={false} video={video} />
						</div>
					)
				})}
			</div>
			<div ref={externalRef as LegacyRef<HTMLDivElement>} id='visor'></div>
		</div>
	)
}
