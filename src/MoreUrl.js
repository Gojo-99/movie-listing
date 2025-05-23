const fetchAnimeData = async (page, searchQuery = '') => {
	const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

	for (let attempt = 0; attempt < 5; attempt++) {
		try {
			const url = searchQuery
				? `https://api.jikan.moe/v4/anime?page=${page}&q=${searchQuery}&limit=8`
				: `https://api.jikan.moe/v4/anime?page=${page}&limit=8`

			const response = await fetch(url)

			if (response.status === 429) {
				console.log(`Ошибка 429. Попытка №${attempt + 1}. Ждем...`)
				await delay(1000)
				continue
			}

			if (response.ok) {
				const data = await response.json()
				return data.data
			} else {
				throw new Error(`Ошибка при запросе данных: ${response.statusText}`)
			}
		} catch (error) {
			console.error('Error fetching data:', error)
			throw error
		}
	}

	throw new Error('Не удалось получить данные после нескольких попыток')
}

export { fetchAnimeData }

const fetchMangaData = async (page, searchQuery = '') => {
	const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

	for (let attempt = 0; attempt < 5; attempt++) {
		try {
			const url = searchQuery
				? `https://api.jikan.moe/v4/manga?page=${page}&q=${searchQuery}&limit=8`
				: `https://api.jikan.moe/v4/manga?page=${page}&limit=8`

			const response = await fetch(url)

			if (response.status === 429) {
				console.log(`Ошибка 429. Попытка №${attempt + 1}. Ждем...`)
				await delay(1000)
				continue
			}

			if (response.ok) {
				const data = await response.json()
				return data.data
			} else {
				throw new Error(`Ошибка при запросе данных: ${response.statusText}`)
			}
		} catch (error) {
			console.error('Error fetching data:', error)
			throw error
		}
	}

	throw new Error('Не удалось получить данные после нескольких попыток')
}

export { fetchMangaData }
