import './SuggestMe.css'
import { useState } from 'react'
import search from '../../img/Left Icon.png'
import { Link } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'

const SuggestMe = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [animeResults, setAnimeResults] = useState([])
	const [mangaResults, setMangaResults] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleSearch = async () => {
		if (!searchQuery) return

		setLoading(true)
		setError(null)

		try {
			const animeResponse = await fetch(
				`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=8`
			)
			const mangaResponse = await fetch(
				`https://api.jikan.moe/v4/manga?q=${searchQuery}&limit=8`
			)

			const animeData = await animeResponse.json()
			const mangaData = await mangaResponse.json()

			setAnimeResults(animeData.data || [])
			setMangaResults(mangaData.data || [])
		} catch (err) {
			console.error('Ошибка при запросе:', err)
			setError('Ошибка загрузки данных 😕')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='suggestme'>
			<div className='section'>
				<div className='suggest-block'>
					<h1>Suggest me</h1>
					<p>
						I will really appreciate it if you take time to suggest me something
						good to watch or read.
					</p>
					<div className='inline-block'>
						<div className='input-box'>
							<img src={search} alt='search' />
							<input
								type='search'
								placeholder='Search Anime or Manga'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
						</div>

						<button onClick={handleSearch}>Search</button>
					</div>
				</div>

				{loading && (
					<div className='spinner-box'>
						<CircularProgress color='secondary' />
					</div>
				)}
				{error && <p>{error}</p>}

				<div className='results'>
					{animeResults.length > 0 && (
						<div className='anime-results'>
							{animeResults.map(anime => (
								<Link
									to={'/details_page'}
									key={anime.mal_id}
									state={{ anime: anime }}
								>
									<div className='card'>
										<div className='poster-box'>
											<img src={anime.images.webp.large_image_url} alt='' />
											<span>⁕ {anime.score}</span>
										</div>

										<p>
											{anime.title.length > 20
												? anime.title.substring(0, 20) + '...'
												: anime.title}
										</p>
									</div>
								</Link>
							))}
						</div>
					)}

					{mangaResults.length > 0 && (
						<div className='manga-results'>
							{mangaResults.map(manga => (
								<Link
									to={'/about_manga'}
									key={manga.mal_id}
									state={{ manga: manga }}
								>
									<div className='card'>
										<div className='poster-box'>
											<img src={manga.images.webp.large_image_url} alt='' />
											<span>⁕ {manga.score}</span>
										</div>

										<p>
											{manga.title.length > 20
												? manga.title.substring(0, 20) + '...'
												: manga.title}
										</p>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default SuggestMe
