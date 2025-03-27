import './Navbar.css'

import logo from '../../img/logo.png'
import icon from '../../img/icons8-menu.svg'
import { useState } from 'react'

const Navbar = () => {
	const [actived, isActived] = useState()

    return (
			<div className='navbar'>
				<header>
					<div className='logo'>
						<a href='/'>
							<img src={logo} alt='logotype' />
						</a>
					</div>

					<div className='links'>
						<ul>
							<li>
								<a href='/movies'>Anime</a>
							</li>
							<li>
								<a href='/tvshows'>Manga</a>
							</li>
							<li>
								<a href='/suggestme'>Suggest me →</a>
							</li>
						</ul>
					</div>

					<div className='burger' onClick={() => isActived(!actived)}>
						<img src={icon} alt='' />
					</div>
					<div className={`menu ${actived ? 'active' : ''}`}>
						<div className='box'>
							<div className='list'>
								<a href='/movies'>Anime</a>
								<a href='/tvshows'>Manga</a>
								<a href='suggestme'>Suggest Me →</a>
								<a href='/dashboard'>Dashboard</a>
							</div>

							<div className='btns'>
								<a href='/signin'>Login →</a>
							</div>
						</div>
					</div>
				</header>
			</div>
		)
}

export default Navbar
