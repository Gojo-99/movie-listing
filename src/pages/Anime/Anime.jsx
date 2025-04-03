import './Anime.css'
import search from '../../img/Left Icon.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchAnimeData } from '../../MoreUrl'

import CircularProgress from '@mui/material/CircularProgress'

const Anime = () => {
	const [animeData, setAnimeData] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const [searchin, setSearchin] = useState('')

	const loadAnimeData = async page => {
		setLoading(true)
		try {
			console.log(`Fetching data for page ${page}`)
			const data = await fetchAnimeData(page)
			if (data.length > 0) {
				setAnimeData(data)
			} else {
				setHasMore(false)
			}
		} catch (error) {
			console.error('Error fetching anime data', error)
			setError('Error loading data 😕')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadAnimeData(page)
	}, [page])

	const filteredAnimeData = searchin
		? animeData.filter(e =>
				e.title.toLowerCase().includes(searchin.toLowerCase())
		)
		: animeData

	const handleNextPage = () => {
		if (hasMore && !loading) {
			setPage(prevPage => prevPage + 1)
		}
	}

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(prevPage => prevPage - 1)
		}
	}

	if (loading && page == 1) {
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
							onChange={e => setSearchin(e.target.value)}
							value={searchin}
						/>
					</div>
				</div>

				<div className='items'>items {filteredAnimeData.length}</div>

				<div className='movie-block'>
					{filteredAnimeData.map(e => (
						<Link to={'/details_page'} key={e.mal_id} state={{ anime: e }}>
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
					<button onClick={handlePreviousPage} disabled={loading || page === 1}>
						Back
					</button>
					<span>{page}</span>
					<button onClick={handleNextPage} disabled={loading || !hasMore}>
						Next
					</button>
				</div>

				{!hasMore && <p className='p'>There is no more data 🤷‍♂️</p>}
			</div>
		</div>
	)
}

export default Anime
