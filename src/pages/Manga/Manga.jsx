import './Manga.css'
import search from '../../img/Left Icon.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchMangaData } from '../../MoreUrl'
import CircularProgress from '@mui/material/CircularProgress'

const Manga = () => {
	const [mangaData, setMangaData] = useState([])
	const [loadingPage, setLoadingPage] = useState(false)
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const [searching, setSearching] = useState('')

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
			setError('Произошла ошибка при загрузке данных')
			console.error('Error fetching manga data', error)
		} finally {
			setLoadingPage(false)
		}
	}

	useEffect(() => {
		loadMangaData(page, searching)
	}, [page, searching])

	const handleSearchChange = e => {
		setPage(1) 
		setSearching(e.target.value)
	}

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
						<p>Ничего не найдено по запросу "{searching}"</p>
					)}

					{mangaData.map(e => (
						<Link to={'/about_manga'} key={e.mal_id} state={{ manga: e }}>
							<div className='card'>
								<div className='poster-box'>
									<img src={e.images.webp.large_image_url} alt='' />
									<span>⁕ {e.score}</span>
								</div>

								<p>
									{e.title.length > 20
										? e.title.substring(0, 20) + '...'
										: e.title}
								</p>
							</div>
						</Link>
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

				{!hasMore && <p className='p'>Больше данных нет.</p>}
			</div>
		</div>
	)
}

export default Manga
