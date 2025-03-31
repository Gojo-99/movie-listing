import './Home.css'

import search from '../../img/Left Icon.png'

import { Link } from 'react-router-dom'
import { useState } from 'react'

const Home = ({ movie, manga }) => {
	const [searching, setSearching] = useState('')
	const [isSearch, setIsSearch] = useState(false)

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

				<div className='movie-counter'>
					<h1>
						Anime<span>({movie.length})</span>
					</h1>
				</div>

				<div className='films'>
					{isSearch
						? movie.map(e => {
								if (e.title.includes(searching)) {
									return (
										<Link to={'details_page'} key={e.mal_id}>
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
									)
								}
						  })
						: movie.map(e => {
								return (
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
								)
						  })}
				</div>

				<div className='manga-counter'>
					<h1>
						Manga<span>({movie.length})</span>
					</h1>
				</div>

				<div className='films'>
					{isSearch
						? manga.map(e => {
								if (e.title.includes(searching)) {
									return (
										<Link to={'/about_manga'} key={e.mal_id}>
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
									)
								}
						  })
						: manga.map(e => {
								return (
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
								)
						  })}
				</div>
			</div>
		</div>
	)
}

export default Home
