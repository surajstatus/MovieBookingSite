import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import * as Icons from 'react-bootstrap-icons'
import NoImage from './No Image.jpg'
import '../Styles/Videos.css'
import { Container } from './NavBar.jsx'
import TrailerMovie from '../Trailers/TrailerMovie'
import MovieCard from './MovieCard'

function Movies() {
  const { toogle, inputValue } = useContext(Container)
  const input = inputValue
  const [moviesData, setMovieData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [movieTitle, setMovieTitle] = useState('')
  const [currentMovie, setCurrentMovie] = useState([]);
  const [displayCard, setDisplayCard] = useState(false);


  const shown = input ? 'search' : 'discover'

  const Api = `https://api.themoviedb.org/3/${shown}/movie`

  const Images = "https://image.tmdb.org/t/p/w500"

  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: 'd670aceac6634d294ff37bc3eae504c1',
        query: input
      }
    })
    const results = data.data.results
    setMovieData(results)
  }
  useEffect(() => {
    setTimeout(() => {
      MovieCall()
    }, 100)
  }, [input])
  console.log(moviesData)

  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }

  const movieCardHandler = (movie) => {
    setCurrentMovie(movie);
    setDisplayCard(true);
  }

  const movieCardCloseHandler = () => {
    setCurrentMovie([]);
    setDisplayCard(false);
  }


  return (
    <Fragment>
      <div className={toogle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='movies-container'>
          {moviesData.map((movie) => {
            return (
              <Fragment>
                <div id={trailer ? 'container' : 'NoContainer'} key={movie.id}>
                  <Icons.PlayCircleFill color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => MoviesTitle(movie)} />
                  <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImage} alt=' ' onClick={() => movieCardHandler(movie)} />
                  <h3 id={movie.title.length > 28 ? 'smaller-Text' : ' '} className={toogle ? "mainColor" : 'secondaryColor'}>{movie.title}</h3>
                </div>
              </Fragment>
            )
          })}
          <button style={{cursor:'pointer', borderRadius: '10px', backgroundColor:'transparent', position:'fixed'}}  id={trailer ? 'Nothing' : 'Exit1'} className={toogle ? 'DarkTheme' : 'LightThemeClose'} onClick={() => setTrailer(true)}><Icons.XLg size={35} color='#fff' cursor={'pointer'}  /></button>
        </div>

        {trailer ? console.log : <TrailerMovie moviesTitle={movieTitle} trailercloseHandler={movieCardCloseHandler} />}
        {/* moviecard  */}

        <div className="movieCard-popUp" style={{
          visibility: displayCard ? "visible" : "hidden",
          opacity: displayCard ? "1" : "0"
        }}  >
          <MovieCard  currentMovie={currentMovie} movieCardCloseHandler={movieCardCloseHandler} />
        </div>

      </div>
    </Fragment>
  )
}

export default Movies
