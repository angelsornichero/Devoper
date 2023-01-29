import { useState, useEffect, useRef } from 'react'
// Hook copied from https://github.com/midudev/react-live-coding/blob/master/src/hooks/useNearScreen.js

interface Params {
    distance?: string,
    externalRef?: any,
    once?: boolean
}

const useNearScreen = ({ distance = '100px', externalRef, once = true }: Params = {}) =>  {
	const [isNearScreen, setShow] = useState<boolean>(false)
	const fromRef = useRef()

	useEffect(() => {  
		const element = externalRef ? externalRef.current : fromRef.current

		const onChange = (entries: any, observer: any) => {
			const el = entries[0]
			if (el.isIntersecting) {
				setShow(true)
				once && observer.disconnect()
			} else {
				!once && setShow(false)
			}
		}

		const observer = new IntersectionObserver(onChange, {
			rootMargin: distance
		})

		if (element) observer.observe(element)
        
		return () => observer && observer.disconnect()
	})

	return { isNearScreen, fromRef }
}

export default useNearScreen