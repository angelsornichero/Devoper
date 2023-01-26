
const useLastSearches = (keyword: string) => {
    const addLastKeyword = () => {
        if (keyword === '-') return
        if (!localStorage.getItem('lastSearches')) return localStorage.setItem('lastSearches', JSON.stringify([keyword]))
        const lastSearches = JSON.parse(localStorage.getItem('lastSearches') as string)
        lastSearches.push(keyword)
        localStorage.setItem('lastSearches', JSON.stringify(lastSearches))
    }

    const getLastKeywords = () =>  {
        return JSON.parse(localStorage.getItem('lastSearches') as string)
    }

    return { addLastKeyword, getLastKeywords }
}

export default useLastSearches