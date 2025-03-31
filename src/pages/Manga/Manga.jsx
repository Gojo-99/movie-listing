import './Manga.css'
import search from '../../img/Left Icon.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchMangaData } from '../../MoreUrl'

const Manga = () => {
	const [mangaData, setMangaData] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const [searching, setSearching] = useState('')

	const loadMangaData = async page => {
		setLoading(true)
		try {
			const data = await fetchMangaData(page)
			console.log('Loaded manga data:', data)

			if (data.length > 0) {
				setMangaData(data)
			} else {
				setHasMore(false)
			}
		} catch (error) {
			setError('Произошла ошибка при загрузке данных')
			console.error('Error fetching manga data', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadMangaData(page)
	}, [page])

	const filteredMangaData = searching
		? mangaData.filter(e => {
				return (
					e.title && e.title.toLowerCase().includes(searching.toLowerCase())
				)
		})
		: mangaData

	console.log('Filtered manga data:', filteredMangaData)

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

	if (loading && page === 1) {
		return <p className='p'>Загрузка...</p>
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
							onChange={e => setSearching(e.target.value)}
							value={searching}
						/>
					</div>
				</div>

				<div className='items'>items {filteredMangaData.length}</div>

				<div className='manga-block'>
					{filteredMangaData.length === 0 && searching && (
						<p>Ничего не найдено по запросу "{searching}"</p>
					)}

					{filteredMangaData.map(e => (
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
					<button onClick={handlePreviousPage} disabled={loading || page === 1}>
						Back
					</button>
					<span>{page}</span>
					<button onClick={handleNextPage} disabled={loading || !hasMore}>
						Next
					</button>
				</div>

				{!hasMore && <p className='p'>Больше данных нет.</p>}
			</div>
		</div>
	)
}

export default Manga
