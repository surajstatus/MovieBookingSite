import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import * as Icons from 'react-bootstrap-icons'
import NoImage from './No Image.jpg'
import '../Styles/Videos.css'
import { Container } from './NavBar.jsx'
import TrailerMovie from '../Trailers/TrailerMovie'

function Trends() {
  const { toogle } = useContext(Container)
  const [trendsArray, setTrendsArray] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [trendTitle, setTrendTitle] = useState('')

  const TrendsShown = '/trending/all/week'
  const Api = 'https://api.themoviedb.org/3'

  const Images = "https://image.tmdb.org/t/p/w500"

  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params: {
        api_key: 'd670aceac6634d294ff37bc3eae504c1',
      }
    })
    const results = data.data.results
    setTrendsArray(results)
  }

  useEffect(() => {
    setTimeout(() => {
      Trends()
    }, 100)
  }, [])

  console.log(trendsArray)

  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrailer(!trailer)
  }

  return (
    <Fragment>
      <div className={toogle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='movies-container'>
          {trendsArray.map((trend) => {
            return (
              <Fragment>
                <div id={trailer ? 'container' : 'NoContainer'} key={trend.id}>
                  <Icons.PlayCircleFill color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TrendTitle(trend)} />
                  <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImage} alt=' ' onClick={() => TrendTitle(trend)} />
                  <h3 id='smaller-Text' className={toogle ? "mainColor" : 'secondaryColor'}>{trend.title}</h3>
                </div>
              </Fragment>
            )
          })}
          {trailer ? console.log : <TrailerMovie moviesTitle={trendTitle} />}
          <Icons.XLg id={trailer ? 'Nothing' : 'Exit1'} className={toogle ? 'DarkTheme' : 'LightThemeClose'} fontSize={35} color='#fff' cursor={'pointer'} onClick={() => setTrailer(true)} />
        </div>
      </div>
    </Fragment>
  )
}

export default Trends
