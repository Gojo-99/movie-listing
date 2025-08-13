import './Home.css'
import searchIcon from '../../img/Left Icon.png'
import like from '../../img/like.png'
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

let debounceTimeout

const allGenres = [
	{ id: 1, name: 'Action' },
	{ id: 2, name: 'Adventure' },
	{ id: 3, name: 'Cars' },
	{ id: 4, name: 'Comedy' },
	{ id: 5, name: 'Dementia' },
	{ id: 6, name: 'Demons' },
	{ id: 7, name: 'Mystery' },
	{ id: 8, name: 'Drama' },
	{ id: 9, name: 'Ecchi' },
	{ id: 10, name: 'Fantasy' },
	{ id: 11, name: 'Game' },
	{ id: 12, name: 'Hentai' },
	{ id: 13, name: 'Historical' },
	{ id: 14, name: 'Horror' },
	{ id: 15, name: 'Kids' },
	{ id: 16, name: 'Magic' },
	{ id: 17, name: 'Martial Arts' },
	{ id: 18, name: 'Mecha' },
	{ id: 19, name: 'Music' },
	{ id: 20, name: 'Parody' },
	{ id: 21, name: 'Samurai' },
	{ id: 22, name: 'Romance' },
	{ id: 23, name: 'School' },
	{ id: 24, name: 'Sci-Fi' },
	{ id: 25, name: 'Shoujo' },
	{ id: 26, name: 'Shoujo Ai' },
	{ id: 27, name: 'Shounen' },
	{ id: 28, name: 'Shounen Ai' },
	{ id: 29, name: 'Space' },
	{ id: 30, name: 'Sports' },
	{ id: 31, name: 'Super Power' },
	{ id: 32, name: 'Vampire' },
	{ id: 33, name: 'Yaoi' },
	{ id: 34, name: 'Yuri' },
	{ id: 35, name: 'Harem' },
	{ id: 36, name: 'Slice of Life' },
	{ id: 37, name: 'Supernatural' },
	{ id: 38, name: 'Military' },
	{ id: 39, name: 'Police' },
	{ id: 40, name: 'Psychological' },
	{ id: 41, name: 'Thriller' },
	{ id: 42, name: 'Seinen' },
	{ id: 43, name: 'Josei' },
]

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
	const [selectedGenre, setSelectedGenre] = useState('')
	const [showFilter, setShowFilter] = useState(false)

	const [suggestedItems, setSuggestedItems] = useState([])

	useEffect(() => {
		const savedSuggestions = localStorage.getItem('suggestedItems')
		if (savedSuggestions) {
			setSuggestedItems(JSON.parse(savedSuggestions))
		}
	}, [])

	const fetchData = async () => {
		try {
			let url = ''
			const genreParam = selectedGenre ? `&genres=${selectedGenre}` : ''

			if (isSearch && searching.trim()) {
				url = `https://api.jikan.moe/v4/${activeTab}?q=${searching}&limit=10&page=${
					activeTab === 'anime' ? searchAnimePage : searchMangaPage
				}${genreParam}`
			} else {
				url = `https://api.jikan.moe/v4/${activeTab}?limit=10&page=${
					activeTab === 'anime' ? animePage : mangaPage
				}${genreParam}`
			}

			const res = await axios.get(url)
			const data = res.data.data

			if (isSearch && searching.trim()) {
				if (activeTab === 'anime') setSearchedAnime(prev => [...prev, ...data])
				else setSearchedManga(prev => [...prev, ...data])
			} else {
				if (activeTab === 'anime') setAnimeList(prev => [...prev, ...data])
				else setMangaList(prev => [...prev, ...data])
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
		fetchData()
	}, [animePage, mangaPage, selectedGenre])

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

	useEffect(() => {
		if (isSearch && searching.trim()) fetchData()
	}, [activeTab, selectedGenre])

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
						List of anime, I, <span>Marato San</span> have watched till date.
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
						<div key={item.mal_id} className='card'>
							<Link
								to={activeTab === 'anime' ? 'details_page' : '/about_manga'}
								state={{ [activeTab]: item }}
							>
								<div className='poster-box'>
									<img src={getImage(item)} alt={item.title} />
									<span>⁕ {item.score ?? 'N/A'}</span>
								</div>
								<p>
									{item.title.length > 20
										? item.title.slice(0, 20) + '...'
										: item.title}
								</p>
							</Link>
							<div className='like'>
								<button
									onClick={() => handleSuggest(item, activeTab)}
									disabled={isAlreadySuggested(item.mal_id)}
								>
									<img src={like} alt='like-icon' />
									{isAlreadySuggested(item.mal_id)
										? 'Already suggested'
										: 'Suggest this'}
								</button>
							</div>
						</div>
					))}

					{isFetching && (
						<div className='loader'>
							<CircularProgress color='secondary' />
						</div>
					)}
				</div>
			</div>

			<div className='floating-filter'>
				<button
					className='fab-button'
					onClick={() => setShowFilter(prev => !prev)}
				>
					🎯 Filter
				</button>
				{showFilter && (
					<div className='filter-panel'>
						<label>Genre:</label>
						<select
							value={selectedGenre}
							onChange={e => {
								setSelectedGenre(e.target.value)
								setAnimeList([])
								setMangaList([])
								setSearchedAnime([])
								setSearchedManga([])
								setAnimePage(1)
								setMangaPage(1)
								setSearchAnimePage(1)
								setSearchMangaPage(1)
							}}
						>
							<option value=''>All Genres</option>
							{allGenres.map(g => (
								<option key={g.id} value={g.id}>
									{g.name}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
