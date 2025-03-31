import './Anime.css'
import search from '../../img/Left Icon.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchAnimeData } from '../../MoreUrl'

const Anime = () => {
	const [animeData, setAnimeData] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const [searchin, setSearchin] = useState('')

	const loadAnimeData = async () => {
		setLoading(true)
		try {
			console.log(`Fetching data for page ${page}`) 
			const data = await fetchAnimeData(page)
			if (data.length > 0) {
				setAnimeData(prevData => [...prevData, ...data])
				setPage(prevPage => prevPage + 1)
			} else {
				setHasMore(false)
			}
		} catch (error) {
			console.error('Error fetching anime data', error)
			setError('Произошла ошибка при загрузке данных')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadAnimeData()
	}, [page])

	const filteredAnimeData = searchin
		? animeData.filter(e => {
			return (
				e.title.toLowerCase().includes(searchin.toLowerCase())
			)
		})
		: animeData 

	if (loading && page === 1) {
		return <p className='p'>Загрузка...</p>
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
						<img src={search} />
						<input
							type='search'
							placeholder='Search Anime'
							onChange={e => setSearchin(e.target.value)}
							value={searchin}
						/>
					</div>
				</div>

				<div className='items'>items {filteredAnimeData.length}</div>

				<InfiniteScroll
					dataLength={filteredAnimeData.length}
					next={loadAnimeData}
					hasMore={hasMore}
					loader={<p className='p'>Загрузка...</p>}
					endMessage={<p className='p'>Больше данных нет.</p>}
				>
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
				</InfiniteScroll>
			</div>
		</div>
	)
}

export default Anime
