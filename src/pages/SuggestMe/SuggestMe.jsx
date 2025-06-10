import './SuggestMe.css'
import { useState, useEffect } from 'react'
import search from '../../img/Left Icon.png'
import { Link, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import like from '../../img/like.png'

const SuggestMe = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [animeResults, setAnimeResults] = useState([])
	const [mangaResults, setMangaResults] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [suggestedItems, setSuggestedItems] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const savedSuggestions = localStorage.getItem('suggestedItems')
		if (savedSuggestions) {
			setSuggestedItems(JSON.parse(savedSuggestions))
		}
	}, [])

	const handleSearch = async () => {
		if (!searchQuery) return

		setLoading(true)
		setError(null)

		try {
			const [animeResponse, mangaResponse] = await Promise.all([
				fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=25`),
				fetch(`https://api.jikan.moe/v4/manga?q=${searchQuery}&limit=25`),
			])

			const animeData = await animeResponse.json()
			const mangaData = await mangaResponse.json()

			setAnimeResults(animeData.data || [])
			setMangaResults(mangaData.data || [])
		} catch (err) {
			console.error('Error while requesting:', err)
			setError('Error loading data 😕')
		} finally {
			setLoading(false)
		}
	}

	const handleSuggest = (item, type) => {
		const newItem = {
			mal_id: item.mal_id,
			title: item.title,
			images: item.images,
			score: item.score,
			type: type,
			date: new Date().toISOString(),
		}

		const updatedSuggestions = [...suggestedItems, newItem]
		setSuggestedItems(updatedSuggestions)
		localStorage.setItem('suggestedItems', JSON.stringify(updatedSuggestions))
	}

	const isAlreadySuggested = id => {
		return suggestedItems.some(item => item.mal_id === id)
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
								onKeyDown={e => e.key === 'Enter' && handleSearch()}
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
				{error && <p className='error-message'>{error}</p>}

				<div className='results'>
					{animeResults.length > 0 && (
						<div className='anime-results'>
							<h2>Anime Results</h2>
							<div className='results-grid'>
								{animeResults.map(anime => (
									<div key={anime.mal_id} className='card-container'>
										<Link to={'/details_page'} state={{ anime: anime }}>
											<div className='card'>
												<div className='poster-box'>
													<img
														src={anime.images?.webp?.large_image_url}
														alt={anime.title}
														onError={e => {
															e.target.src =
																'https://via.placeholder.com/300x400?text=No+Image'
														}}
													/>
													{anime.score && <span>⁕ {anime.score}</span>}
												</div>
												<p>
													{anime.title.length > 20
														? anime.title.substring(0, 20) + '...'
														: anime.title}
												</p>
											</div>
										</Link>
										<div className='like'>
											<button
												onClick={() => handleSuggest(anime, 'anime')}
												disabled={isAlreadySuggested(anime.mal_id)}
											>
												<img src={like} alt='like-icon' />
												{isAlreadySuggested(anime.mal_id)
													? 'Already suggested'
													: 'Suggest this'}
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{mangaResults.length > 0 && (
						<div className='manga-results'>
							<h2>Manga Results</h2>
							<div className='results-grid'>
								{mangaResults.map(manga => (
									<div key={manga.mal_id} className='card-container'>
										<Link to={'/about_manga'} state={{ manga: manga }}>
											<div className='card'>
												<div className='poster-box'>
													<img
														src={manga.images?.webp?.large_image_url}
														alt={manga.title}
														onError={e => {
															e.target.src =
																'https://via.placeholder.com/300x400?text=No+Image'
														}}
													/>
													{manga.score && <span>⁕ {manga.score}</span>}
												</div>
												<p>
													{manga.title.length > 20
														? manga.title.substring(0, 20) + '...'
														: manga.title}
												</p>
											</div>
										</Link>
										<div className='like'>
											<button
												onClick={() => handleSuggest(manga, 'manga')}
												disabled={isAlreadySuggested(manga.mal_id)}
											>
												<img src={like} alt='like-icon' />
												{isAlreadySuggested(manga.mal_id)
													? 'Already suggested'
													: 'Suggest this'}
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default SuggestMe
