import { Link, useLocation } from "react-router-dom"
import "./AboutManga.css"

const AboutManga = () => {
    const { state } = useLocation()

    return (
			<div className='aboutManga'>
				<div className='hero'>
					<img src={state.manga?.images.jpg.large_image_url} alt='' />
					<div className='block'>
						<span>
							<Link to={'/'}>AnimePulse</Link> /{' '}
							<Link to={'/manga'}>Manga</Link>
						</span>
						<h1>{state.manga?.title}</h1>
					</div>
				</div>

				<div className='info-block'>
					<div className='post'>
						<img src={state.manga?.images.jpg.large_image_url} alt='' />
					</div>

					<div className='about-block'>
						<p>{state.manga?.synopsis}</p>
						<span>⁕ {state.manga?.score}</span>

						<div className='box-txt'>
							<p>Type</p>
							<h4>{state.manga?.type}</h4>
						</div>

						<div className='box-txt'>
							<p>Release Date:</p>
							<h4>{state.manga?.published.from}</h4>
						</div>

						<div className='box-txt'>
							<p>Chapters</p>
							<h4>{state.manga?.chapters}</h4>
						</div>

						<div className='box-txt'>
							<p>Status</p>
							<h4>{state.manga?.status}</h4>
						</div>

						<div className='box-txt'>
							<p>Genres</p>
							<h4>{state.manga?.genres[0].name}</h4>
						</div>
					</div>
				</div>
			</div>
		)
}

export default AboutManga
