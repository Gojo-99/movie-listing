import { Link, useLocation } from 'react-router-dom'
import './Details.css'

const Details = () => {
    const { state } = useLocation()

    return (
        <div className='details'>
            <div className="hero">
                <img src={state.anime?.images.jpg.large_image_url} alt="" />
                <div className="block">
                    <span><Link to={'/'}>AnimePulse</Link> / <Link to={'/anime'}>Anime</Link></span>
                    <h1>{state.anime?.title}</h1>
                </div>
            </div>

            <div className="info-block">
                <div className="post">
                    <img src={state.anime?.images.webp.large_image_url} alt="" />
                </div>

                <div className="about-block">
                    <p>{state.anime?.synopsis}</p>
                    <span> ⁕ {state.anime?.score}</span>

                    <div className="box-txt">
                        <p>Type</p>
                        <h4>{state.anime?.type}</h4>
                    </div>

                    <div className="box-txt">
                        <p>Release Date:</p>
                        <h4>{state.anime?.aired.from}</h4>
                    </div>

                    <div className="box-txt">
                        <p>Run time</p>
                        <h4>{state.anime?.duration}</h4>
                    </div>

                    <div className="box-txt">
                        <p>Genres</p>
                        <h4>{state.anime?.genres[0].name}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
