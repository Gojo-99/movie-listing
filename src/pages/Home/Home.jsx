import './Home.css'
import searchIcon from '../../img/Left Icon.png'
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

let debounceTimeout

const Home = ({ movie, manga }) => {
	const [searching, setSearching] = useState('')
	const [isSearch, setIsSearch] = useState(false)
	const [activeTab, setActiveTab] = useState('anime')

	const [animeList, setAnimeList] = useState(movie || [])
	const [mangaList, setMangaList] = useState(manga || [])
	const [searchedAnime, setSearchedAnime] = useState([])
	const [searchedManga, setSearchedManga] = useState([])

	const [animePage, setAnimePage] = useState(1)
	const [mangaPage, setMangaPage] = useState(1)
	const [searchAnimePage, setSearchAnimePage] = useState(1)
	const [searchMangaPage, setSearchMangaPage] = useState(1)

	const [isFetching, setIsFetching] = useState(false)

	const fetchData = async () => {
		try {
			let url = ''
			if (isSearch && searching.trim()) {
				if (activeTab === 'anime') {
					url = `https://api.jikan.moe/v4/anime?q=${searching}&limit=10&page=${searchAnimePage}`
				} else {
					url = `https://api.jikan.moe/v4/manga?q=${searching}&limit=10&page=${searchMangaPage}`
				}
			} else {
				if (activeTab === 'anime') {
					url = `https://api.jikan.moe/v4/anime?limit=10&page=${animePage}`
				} else {
					url = `https://api.jikan.moe/v4/manga?limit=10&page=${mangaPage}`
				}
			}

			const res = await axios.get(url)
			const data = res.data.data

			if (isSearch && searching.trim()) {
				if (activeTab === 'anime') {
					setSearchedAnime(prev => [...prev, ...data])
				} else {
					setSearchedManga(prev => [...prev, ...data])
				}
			} else {
				if (activeTab === 'anime') {
					setAnimeList(prev => [...prev, ...data])
				} else {
					setMangaList(prev => [...prev, ...data])
				}
			}
		} catch (err) {
			console.error('Error loading:', err)
		} finally {
			setIsFetching(false)
		}
	}

	useEffect(() => {
		if (!isFetching) return

		if (isSearch) {
			if (activeTab === 'anime') setSearchAnimePage(p => p + 1)
			else setSearchMangaPage(p => p + 1)
		} else {
			if (activeTab === 'anime') setAnimePage(p => p + 1)
			else setMangaPage(p => p + 1)
		}
	}, [isFetching])

	useEffect(() => {
		if (isSearch) {
			if (
				(activeTab === 'anime' && searchAnimePage > 1) ||
				(activeTab === 'manga' && searchMangaPage > 1)
			) {
				fetchData()
			}
		}
	}, [searchAnimePage, searchMangaPage])

	useEffect(() => {
		if (!isSearch) fetchData()
	}, [animePage, mangaPage])

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY + 100 >=
					document.body.offsetHeight &&
				!isFetching
			) {
				setIsFetching(true)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isFetching])

	const debouncedSearch = useCallback(
		value => {
			clearTimeout(debounceTimeout)
			debounceTimeout = setTimeout(() => {
				setIsSearch(!!value.trim())

				if (value.trim()) {
					if (activeTab === 'anime') {
						setSearchedAnime([])
						setSearchAnimePage(1)
					} else {
						setSearchedManga([])
						setSearchMangaPage(1)
					}
				}
			}, 500)
		},
		[activeTab]
	)

	const handleSearchChange = e => {
		setSearching(e.target.value)
		debouncedSearch(e.target.value)
	}

	useEffect(() => {
		if (isSearch && searching.trim()) {
			fetchData()
		}
	}, [activeTab])

	const displayList =
		activeTab === 'anime'
			? isSearch
				? searchedAnime
				: animeList
			: isSearch
			? searchedManga
			: mangaList

	const getImage = item =>
		item?.images?.webp?.large_image_url || item?.image_url || ''

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
						<img src={searchIcon} alt='search' />
						<input
							type='search'
							placeholder='Search anime or manga'
							onChange={handleSearchChange}
							value={searching}
						/>
					</div>
				</div>

				<div className='tab-switcher'>
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
					{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{' '}
					<span>({displayList.length})</span>
				</div>

				<div className='films'>
					{displayList.map(item => (
						<Link
							key={item.mal_id}
							to={activeTab === 'anime' ? 'details_page' : '/about_manga'}
							state={{ [activeTab]: item }}
						>
							<div className='card'>
								<div className='poster-box'>
									<img src={getImage(item)} alt={item.title} />
									<span>⁕ {item.score ?? 'N/A'}</span>
								</div>
								<p>
									{item.title.length > 20
										? item.title.slice(0, 20) + '...'
										: item.title}
								</p>
							</div>
						</Link>
					))}
				</div>

				{isFetching && (
					<div className='loader'>
						<CircularProgress color='secondary' />
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
