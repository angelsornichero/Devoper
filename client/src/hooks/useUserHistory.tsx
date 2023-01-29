import { Video } from '../types/Video.type'

const useUserHistory = () => {
  
	const getHistory = () => {
		const rawVideos = localStorage.getItem('lastVideos') ? localStorage.getItem('lastVideos') : '[]'
		const videos: Array<any> = JSON.parse(rawVideos as string)
		return videos
	}

	const history: any = getHistory()
  
	const addVideoToHistory = (video: Video) => {
		const filterHistory = history.filter((el: Video) => el._id === video._id)
		if (filterHistory.length > 0) return
		history.push(video)
		localStorage.setItem('lastVideos', JSON.stringify(history))
	}

  

	return { getHistory, addVideoToHistory }

}

export default useUserHistory