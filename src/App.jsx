import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import Anime from "./pages/Anime/Anime"
import Manga from './pages/Manga/Manga'
import NotFound404 from "./pages/NotFound404/NotFound404"
import Details from "./pages/Details/Details"

import { useEffect, useState } from 'react'

import axios from 'axios'
import { Manga_Api, URL_API } from "./URL"
import AboutManga from "./pages/AboutManga/AboutManga"

import CircularProgress from '@mui/material/CircularProgress'
import Login from './pages/Login/Login'
import Suggested from "./pages/Suggested/Suggested"


const App = () => {
      const [film, setFilm] = useState([])
      const [manga, setManga] = useState([])
      const [page, setPage] = useState(1)
      const [page2, setPage2] = useState(1)

      const [loadin, setloadin] = useState(false)

      function getFilms() {
          axios.get(URL_API)
          .then(res => {
              setloadin(true)
              setFilm(res.data?.data)
              console.log(res.data.data)
          })
          .catch(err => console.log(err))
      }

      function getManga() {
        axios.get(Manga_Api)
        .then(res => {
          setloadin(true)
          setManga(res.data?.data)
          console.log(res.data.data)
        })
        .catch(err => console.log(err))
      }
  
      useEffect(() => {
          getFilms()
          getManga()
      }, [])

        if (!loadin) {
					return (
						<div className='spinner-box'>
							<CircularProgress color='secondary' />
						</div>
					)
				}

  return (
		<div>
			<BrowserRouter>
				<Navbar />

				<Routes>
					<Route path='/' element={<Home movie={film} manga={manga} />} />
					<Route path='/anime' element={<Anime page={page} setPage={setPage} />} />
					<Route path='/manga' element={<Manga page2={page2} setPage2={setPage2} />} />
          <Route path='/suggested' element={<Suggested />} />
					<Route path='/details_page' element={<Details />} />
					<Route path='/about_manga' element={<AboutManga />} />
					<Route path='/login_page' element={<Login />} />
					<Route path='*' element={<NotFound404 />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
