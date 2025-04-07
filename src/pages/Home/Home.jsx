import './Home.css'

import search from '../../img/Left Icon.png'

import { Link } from 'react-router-dom'
import { useState } from 'react'

const Home = ({ movie, manga }) => {
	const [searching, setSearching] = useState('')
	const [isSearch, setIsSearch] = useState(false)

	const [activeTab, setActiveTab] = useState('all')

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
							onChange={e => setSearching(e.target.value)}
						/>
					</div>
				</div>

				<div className='tab-switcher'>
					<button
						className={activeTab === 'all' ? 'tab active' : 'tab'}
						onClick={() => setActiveTab('all')}
					>
						All
					</button>
					<button
						className={activeTab === 'anime' ? 'tab active' : 'tab'}
						onClick={() => setActiveTab('anime')}
					>
						Anime
					</button>
					<button
						className={activeTab === 'manga' ? 'tab active' : 'tab'}
						onClick={() => setActiveTab('manga')}
					>
						Manga
					</button>
				</div>

				<div className='tab-header'>
					{activeTab === 'all' && (
						<>
							All <span>({movie.length + manga.length})</span>
						</>
					)}
					{activeTab === 'anime' && (
						<>
							Anime <span>({movie.length})</span>
						</>
					)}
					{activeTab === 'manga' && (
						<>
							Manga <span>({manga.length})</span>
						</>
					)}
				</div>

				<div className='films'>
					{(activeTab === 'all' || activeTab === 'anime') &&
						(isSearch
							? movie.filter(e => e.title.includes(searching))
							: movie
						).map(e => (
							<Link to={'details_page'} key={e.mal_id} state={{ anime: e }}>
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

					{(activeTab === 'all' || activeTab === 'manga') &&
						(isSearch
							? manga.filter(e => e.title.includes(searching))
							: manga
						).map(e => (
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
			</div>
		</div>
	)
}

export default Home
