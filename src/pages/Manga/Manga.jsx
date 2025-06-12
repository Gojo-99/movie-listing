import './Manga.css'
import search from '../../img/Left Icon.png'
import like from '../../img/like.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchMangaData } from '../../MoreUrl'
import CircularProgress from '@mui/material/CircularProgress'

const Manga = ({ page2, setPage2 }) => {
	const [mangaData, setMangaData] = useState([])
	const [loadingPage, setLoadingPage] = useState(false)
	const [error, setError] = useState(null)
	const [hasMore, setHasMore] = useState(true)

	const [searching, setSearching] = useState('')
	const [suggestedItems, setSuggestedItems] = useState([])

	const loadMangaData = async (currentPage, searchQuery = '') => {
		setLoadingPage(true)
		try {
			const data = await fetchMangaData(currentPage, searchQuery)
			if (data.length > 0) {
				setMangaData(data)
				setHasMore(true)
			} else {
				setHasMore(false)
				setMangaData([])
			}
		} catch (error) {
			setError('Error loading data 😕')
			console.error('Error fetching manga data', error)
		} finally {
			setLoadingPage(false)
		}
	}

	useEffect(() => {
		loadMangaData(page2, searching)
	}, [page2, searching])

	useEffect(() => {
		const savedSuggestions = localStorage.getItem('suggestedItems')
		if (savedSuggestions) {
			setSuggestedItems(JSON.parse(savedSuggestions))
		}
	}, [])

	const handleSearchChange = e => {
		setPage2(1)
		setSearching(e.target.value)
	}

	const handleNextPage = () => {
		if (hasMore && !loadingPage) {
			setPage2(prevPage => prevPage + 1)
		}
	}

	const handlePreviousPage = () => {
		if (page2 > 1) {
			setPage2(prevPage => prevPage - 1)
		}
	}

	if (loadingPage && searching.trim() === '') {
		return (
			<div className='spinner-box'>
				<CircularProgress color='secondary' />
			</div>
		)
	}

	if (error) {
		return <p className='p'>{error}</p>
	}

	const handleSuggest = e => {
		const newItem = {
			mal_id: e.mal_id,
			title: e.title,
			images: e.images,
			score: e.score,
			type: 'manga',
			date: new Date().toISOString(),
		}

		const updatedSuggestions = [...suggestedItems, newItem]
		setSuggestedItems(updatedSuggestions)
		localStorage.setItem('suggestedItems', JSON.stringify(updatedSuggestions))
	}

	const isAlreadySuggested = id => {
		return suggestedItems.some(e => e.mal_id === id)
	}

	return (
		<div className='manga'>
			<div className='section'>
				<div className='manga-hereko'>
					<span>AnimePulse</span>
					<h1>Manga</h1>
					<div className='input-box'>
						<img src={search} />
						<input
							type='search'
							placeholder='Search Manga'
							onChange={handleSearchChange}
							value={searching}
						/>
					</div>
				</div>

				<div className='items'>items {mangaData.length}</div>

				<div className='manga-block'>
					{mangaData.length === 0 && searching && (
						<p>Nothing found for your request 🤒</p>
					)}

					{mangaData.map(e => (
						<div className='card' key={e.mal_id}>
							<Link to={'/about_manga'} state={{ manga: e }}>
								<div className='poster-box'>
									<img src={e.images.webp.large_image_url} alt='' />
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
						disabled={loadingPage || page2 === 1}
					>
						Back
					</button>
					<span>{page2}</span>
					<button onClick={handleNextPage} disabled={loadingPage || !hasMore}>
						Next
					</button>
				</div>

				{!hasMore && <p className='eror'>There is no more data 🤷‍♂️</p>}
			</div>
		</div>
	)
}

export default Manga
