import React from 'react'
import Videos from '../components/Videos/Videos.js'
import { Navigator } from '../components/Navigator/Navigator.js'
import { LastSearches } from '../components/Navigator/LastSearches.js'

const HomePage = () => {
	return (
		<div>
			<Navigator />
			<LastSearches />
			<Videos />
		</div>
	)
}

export default HomePage