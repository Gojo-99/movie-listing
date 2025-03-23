import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import Movies from "./pages/Movies/Movies"
import TvShows from "./pages/TvShows/TvShows"
import SuggestMe from "./pages/SuggestMe/SuggestMe"
import NotFound404 from "./pages/NotFound404/NotFound404"
import Details from "./pages/Details/Details"

import { useEffect, useState } from 'react'

import axios from 'axios'
import { URL_API } from "./URL"


const App = () => {
      const [film, setFilm] = useState([])
  
      function getFilms() {
          axios.get(URL_API)
          .then(res => {
              setFilm(res.data?.data)
              console.log(res.data.data)
          })
          .catch(err => console.log(err))
      }
  
      useEffect(() => {
          getFilms()
      }, [])

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home movie={film} />}/>
          <Route path="/movies" element={<Movies anime={film}/>}/>
          <Route path="/tvshows" element={<TvShows />}/>
          <Route path="/suggestme" element={<SuggestMe />}/>
          <Route path="/details_page" element={<Details />}/>
          <Route path="*" element={<NotFound404 />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
