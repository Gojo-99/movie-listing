import './Home.css'

import search from '../../img/Left Icon.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import axios from 'axios'

const Home = ({ movie, manga }) => {
	const [searching, setSearching] = useState('')
	const [isSearch, setIsSearch] = useState(false)

	const [activeTab, setActiveTab] = useState('all')

	const [searchedAnime, setSearchedAnime] = useState([])
	const [searchedManga, setSearchedManga] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (searching.trim() !== '') {
					const animeRes = await axios.get(
						`https://api.jikan.moe/v4/anime?q=${searching}&limit=10`
					)
					const mangaRes = await axios.get(
						`https://api.jikan.moe/v4/manga?q=${searching}&limit=10`
					)
					setSearchedAnime(animeRes.data.data || [])
					setSearchedManga(mangaRes.data.data || [])
				} else {
					setSearchedAnime([])
					setSearchedManga([])
				}
			} catch (error) {
				console.error('Ошибка при поиске:', error)
			}
		}

		fetchData()
	}, [searching])

	const displayAnime = isSearch && searching ? searchedAnime : movie
	const displayManga = isSearch && searching ? searchedManga : manga

	const getImage = item => {
		return item?.images?.webp?.large_image_url || item?.image_url || ''
	}

	return (
		<div className='home'>
			<div className='section'>
				<div className='hereko'>
					<h1>AnimePulse</h1>
					<p>
						List of anime, I, <span>Pramod Poudel</span> have watched till date.
						Explore what I have watched and also feel free to make a suggestion.
						😉
					</p>
					<div className='inp-box'>
						<img src={search} onClick={() => setIsSearch(true)} />
						<input
							type='search'
							placeholder='Search anime or manga'
							onChange={e => {
								setSearching(e.target.value)
								setIsSearch(true)
							}}
							value={searching}
						/>
					</div>
				</div>

				<div className='tab-switcher'>
					<button
						className={activeTab === 'all' ? 'tab actived' : 'tab'}
						onClick={() => setActiveTab('all')}
					>
						All
					</button>
					<button
						className={activeTab === 'anime' ? 'tab actived' : 'tab'}
						onClick={() => setActiveTab('anime')}
					>
						Anime
					</button>
					<button
						className={activeTab === 'manga' ? 'tab actived' : 'tab'}
						onClick={() => setActiveTab('manga')}
					>
						Manga
					</button>
				</div>

				<div className='tab-header'>
					{activeTab === 'all' && (
						<>
							All <span>({displayAnime.length + displayManga.length})</span>
						</>
					)}
					{activeTab === 'anime' && (
						<>
							Anime <span>({displayAnime.length})</span>
						</>
					)}
					{activeTab === 'manga' && (
						<>
							Manga <span>({displayManga.length})</span>
						</>
					)}
				</div>

				<div className='films'>
					{(activeTab === 'all' || activeTab === 'anime') &&
						displayAnime.map(e => (
							<Link to={'details_page'} key={e.mal_id} state={{ anime: e }}>
								<div className='card'>
									<div className='poster-box'>
										<img src={getImage(e)} alt={e.title} />
										<span>⁕ {e.score ?? 'N/A'}</span>
									</div>
									<p>
										{e.title?.length > 20
											? e.title.substring(0, 20) + '...'
											: e.title}
									</p>
								</div>
							</Link>
						))}

					{(activeTab === 'all' || activeTab === 'manga') &&
						displayManga.map(e => (
							<Link to={'/about_manga'} key={e.mal_id} state={{ manga: e }}>
								<div className='card'>
									<div className='poster-box'>
										<img src={getImage(e)} alt={e.title} />
										<span>⁕ {e.score ?? 'N/A'}</span>
									</div>
									<p>
										{e.title?.length > 20
											? e.title.substring(0, 20) + '...'
											: e.title}
									</p>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	)
}

export default Home
