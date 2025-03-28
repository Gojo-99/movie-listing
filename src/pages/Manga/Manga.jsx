import './Manga.css'

import search from '../../img/Left Icon.png'

import { Link } from 'react-router-dom'
import { useState } from 'react'


const TvShows = ({ manga }) => {
    const [searching, setSearching] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    return (
        <div className='manga'>
            <div className="section">
                <div className="manga-hereko">
                    <span>AnimePulse</span>
                    <h1>Manga</h1>
                    <div className='input-box'>
                        <img src={search} onClick={() => setIsSearching(true)} />
                        <input
                            type='search'
                            placeholder='Search Manga'
                            onChange={e => setSearching(e.target.value)}
                        />
                    </div>
                </div>

                <div className="items">
                    items {manga.length}
                </div>

                <div className="manga-block">
                    {isSearching
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

export default TvShows
