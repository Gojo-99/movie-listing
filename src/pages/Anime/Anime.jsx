import './Anime.css'
import search from '../../img/Left Icon.png'
import like from '../../img/like.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchAnimeData } from '../../MoreUrl'
import CircularProgress from '@mui/material/CircularProgress'

const Anime = ({ page, setPage }) => {
	const [animeData, setAnimeData] = useState([])
	const [loadingPage, setLoadingPage] = useState(false)
	const [error, setError] = useState(null)
	const [hasMore, setHasMore] = useState(true)

	const [searchin, setSearchin] = useState('')
	const [suggestedItems, setSuggestedItems] = useState([])

	const loadPageData = async (currentPage, searchQuery = '') => {
		setLoadingPage(true)
		try {
			const data = await fetchAnimeData(currentPage, searchQuery)
			if (data.length > 0) {
				setAnimeData(data)
				setHasMore(true)
			} else {
				setHasMore(false)
			}
		} catch (error) {
			console.error('Error fetching anime data', error)
			setError('Error loading data 😕')
		} finally {
			setLoadingPage(false)
		}
	}

	useEffect(() => {
		loadPageData(page, searchin)
	}, [page, searchin])

	useEffect(() => {
		const savedSuggestions = localStorage.getItem('suggestedItems')
		if (savedSuggestions) {
			setSuggestedItems(JSON.parse(savedSuggestions))
		}
	}, [])

	const handleNextPage = () => {
		if (hasMore && !loadingPage) {
			setPage(prevPage => prevPage + 1)
		}
	}

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(prevPage => prevPage - 1)
		}
	}

	const handleSearchChange = e => {
		setPage(1)
		setSearchin(e.target.value)
	}

	const handleSuggest = e => {
		const newItem = {
			mal_id: e.mal_id,
			title: e.title,
			images: e.images,
			score: e.score,
			type: 'anime',
			date: new Date().toISOString(),
		}

		const updatedSuggestions = [...suggestedItems, newItem]
		setSuggestedItems(updatedSuggestions)
		localStorage.setItem('suggestedItems', JSON.stringify(updatedSuggestions))
	}

	const isAlreadySuggested = id => {
		return suggestedItems.some(e => e.mal_id === id)
	}

	if (loadingPage && searchin.trim() === '') {
		return (
			<div className='spinner-box'>
				<CircularProgress color='secondary' />
			</div>
		)
	}

	if (error) {
		return <p className='err'>{error}</p>
	}

	return (
		<div className='movies'>
			<div className='section'>
				<div className='movies-hereko'>
					<span>AnimePulse</span>
					<h1>Anime</h1>
					<div className='input-box'>
						<img src={search} alt='search' />
						<input
							type='search'
							placeholder='Search Anime'
							onChange={handleSearchChange}
							value={searchin}
						/>
					</div>
				</div>

				<div className='items'>items {animeData.length}</div>

				<div className='movie-block'>
					{animeData.map(e => (
						<div className='card' key={e.mal_id}>
							<Link to={'/details_page'} state={{ anime: e }}>
								<div className='poster-box'>
									<img src={e.images.webp.large_image_url} alt={e.title} />
									<span>⁕ {e.score}</span>
								</div>
								<p>
									{e.title.length > 20
										? e.title.substring(0, 20) + '...'
										: e.title}
								</p>
							</Link>

							<div className='like'>
								<button
									onClick={() => handleSuggest(e)}
									disabled={isAlreadySuggested(e.mal_id)}
								>
									<img src={like} alt='like-icon' />
									{isAlreadySuggested(e.mal_id)
										? 'Already suggested'
										: 'Suggest this'}
								</button>
							</div>
						</div>
					))}
				</div>

				<div className='pagination'>
					<button
						onClick={handlePreviousPage}
						disabled={loadingPage || page === 1}
					>
						Back
					</button>
					<span>{page}</span>
					<button onClick={handleNextPage} disabled={loadingPage || !hasMore}>
						Next
					</button>
				</div>

				{!hasMore && <p className='d-err'>There is no more data 🤷‍♂️</p>}
			</div>
		</div>
	)
}

export default Anime
