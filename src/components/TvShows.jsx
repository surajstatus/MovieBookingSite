import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import NoImage from './No Image.jpg'
import * as Icons from 'react-bootstrap-icons'
import '../Styles/Videos.css'
import { Container } from './NavBar.jsx'
import TrailerTvShow from '../Trailers/TrailerTvShow'



function TvShows() {
  const { toogle, inputValue } = useContext(Container)
  const input = inputValue
  const [showData, setShowData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [title, setTitle] = useState('')
  const shown = input ? 'search' : 'discover'

  const Api = `https://api.themoviedb.org/3/${shown}/tv`
  const Images = "https://image.tmdb.org/t/p/w500"

  const TvShows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: 'd670aceac6634d294ff37bc3eae504c1',
        query: input
      }
    })
    const results = data.data.results
    setShowData(results)
  }
  useEffect(() => {
    setTimeout(() => {
      TvShows()
    }, 100)
  }, [input])
  console.log(showData)

  const TvShowTitle = (shows) => {
    setTitle(shows.name)
    setTrailer(!trailer)
  }


  return (
    <Fragment>
      <div className={toogle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='movies-container'>
          {showData.map((shows) => {
            return (
              <Fragment>
                <div id={trailer ? 'container' : 'NoContainer'} key={shows.id}>
                  <Icons.PlayCircleFill color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TvShowTitle(shows)} />
                  <img src={shows.poster_path ? `${Images}${shows.poster_path}` : NoImage} alt=' ' onClick={() => TvShowTitle(shows)} />
                  <h3 id={shows.name.length > 28 ? 'smaller-Text' : ' '} className={toogle ? "mainColor" : 'secondaryColor'}>{shows.name}</h3>

                </div>
              </Fragment>


            )
          })}
          {trailer ? console.log : <TrailerTvShow TvShowTitle={title} />}
          <Icons.XLg id={trailer ? 'Nothing' : 'Exit1'} className={toogle ? 'DarkTheme' : 'LightThemeClose'} fontSize={35} color='#fff' cursor={'pointer'} onClick={() => setTrailer(true)} />
        </div></div>
    </Fragment>
  )
}

export default TvShows
