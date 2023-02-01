
const useLastSearches = () => {
	const addLastKeyword = (keyword: string) => {
		if (keyword === '-') return
		if (!localStorage.getItem('lastSearches')) return localStorage.setItem('lastSearches', JSON.stringify([keyword]))
		const lastSearches = JSON.parse(localStorage.getItem('lastSearches') as string)
		lastSearches.push(keyword)
		localStorage.setItem('lastSearches', JSON.stringify(lastSearches))
	}

	

	return { addLastKeyword }
}

export default useLastSearches