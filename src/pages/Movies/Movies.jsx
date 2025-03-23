import './Movies.css'

import search from '../../img/Left Icon.png'

import { Link } from 'react-router-dom'
import { useState } from 'react'

const Movies = ({ anime }) => {
    const [searchin, setSearchin] = useState('')
    const [isSearchin, setIsSearchin] = useState(false)

    return (
        <div className='movies'>
            <div className="section">
                <div className="movies-hereko">
                    <span>MaileHereko</span>
                    <h1>Movies</h1>
                    <div className='input-box'>
                        <img src={search} onClick={() => setIsSearchin(true)} />
                        <input
                            type='search'
                            placeholder='Search Movies or Tv Shows'
                            onChange={e => setSearchin(e.target.value)}
                        />
                    </div>
                </div>

                <div className="items">
                    items {anime.length}
                </div>

                <div className="movie-block">
                    {isSearchin
					    ? anime.map(e => {
							if (e.title.includes(searchin)) {
								return (
									<Link to={'/details_page'} key={e.mal_id}>
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
					    : anime.map(e => {
							return (
								<Link to={'/details_page'} key={e.mal_id} state={{anime : e}}>
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

export default Movies
