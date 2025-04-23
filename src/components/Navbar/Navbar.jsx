import './Navbar.css'

import logo from '../../img/logo.png'
import icon from '../../img/icons8-menu.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	const [actived, isActived] = useState()

    return (
			<div className='navbar'>
				<header>
					<div className='logo'>
						<Link to={'/'}>
							<img src={logo} alt='logotype' />
						</Link>
					</div>

					<div className='links'>
						<ul>
							<li>
								<Link to={'/anime'}>Anime</Link>
							</li>
							<li>
								<Link to={'/manga'}>Manga</Link>
								
							</li>
							<li>
								<Link to={'/suggestme'}>Suggest me →</Link>
							</li>
						</ul>
					</div>

					<div className='burger' onClick={() => isActived(!actived)}>
						<img src={icon} alt='' />
					</div>
					<div className={`menu ${actived ? 'active' : ''}`}>
						<div className='box'>
							<div className='list'>
								<Link to={'/anime'}>Anime</Link>
								<Link to={'/manga'}>Manga</Link>
								<Link to={'/suggestme'}>Suggest me →</Link>
								<Link to={'/dashboard'}>Dashboard</Link>
							</div>

							<div className='btns'>
								<Link to={'/login_page'}>Login →</Link>
							</div>
						</div>
					</div>
				</header>
			</div>
		)
}

export default Navbar
