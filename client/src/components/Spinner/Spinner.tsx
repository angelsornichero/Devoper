import React from 'react'

const Spinner = () => {
	return (
		<div className='inline-block relative w-[80px] h-[80px]'>
			<div className='absolute left-[8px] top-[33px] w-[13px] h-[13px] rounded-[50%] bg-white [animation-timing-function: cubic-bezier(0, 1, 1, 0)] animation-[lds-ellipsis1 0.6s infinite]'></div>
			<div className='absolute left-[8px] top-[33px] w-[13px] h-[13px] rounded-[50%] bg-blue-600 [animation-timing-function: cubic-bezier(0, 1, 1, 0)] animation-[lds-ellipsis2 0.6s infinite]'></div>
			<div className='absolute left-[32px] top-[33px] w-[13px] h-[13px] rounded-[50%] bg-green-600 [animation-timing-function: cubic-bezier(0, 1, 1, 0)] animation-[lds-ellipsis2 0.6s infinite]'></div>
			<div className='absolute left-[56px] top-[33px] w-[13px] h-[13px] rounded-[50%] bg-purple-600 [animation-timing-function: cubic-bezier(0, 1, 1, 0)] animation-[lds-ellipsis3 0.6s infinite]'></div>
		</div>
	)
}

export default Spinner
