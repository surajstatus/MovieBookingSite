import React, { Fragment, useState } from 'react'
import * as Icons from 'react-bootstrap-icons'
import '../Styles/NavBarStyle.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import Movies from './Movies'
import Trends from './Trends'
import TvShows from './TvShows'
import Pricing from './Pricing'
import SeatBooking from './SeatBooking'
import SignUp from './SignUp'
import Login from './Login'
import Checkout from './Checkout'
import BookingConfirmation from './BookingConfirmation'
import MovieCard from './MovieCard'
import PrivateRoute from './PrivateRoute'
import Wishlist from './Wishlist'

export const Container = React.createContext()

function Navbar() {
  const [toogle, setToogle] = useState(true)
  const [inputValue, setInputValue] = useState('')
  return (
    <Container.Provider value={{ toogle, inputValue }}>
      <Fragment>
        <nav className={toogle ? '' : 'navBarColor'}>

          <Icons.List className="humberge-list" color='white' size={'30px'} />

          <h1 id={toogle ? '' : 'heading'}>MOVIESFLIX</h1>
          <div className='nav-options'>
            <NavLink to='' style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
              <span id={toogle ? 'Movies' : 'MoviesLight'}>Movies</span>
            </NavLink>

            <NavLink to='/TvShows' style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
              <span id={toogle ? 'Movies' : 'MoviesLight'}>TvShows</span>
            </NavLink>

            <NavLink to='/Trends' style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
              <span id={toogle ? 'Movies' : 'MoviesLight'}>Trends</span>
            </NavLink>

            <NavLink to='/Pricing' style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
              <span id={toogle ? 'Movies' : 'MoviesLight'}>Pricing</span>
            </NavLink>

          </div>


          <div className='input-group'>
            <input type="text" placeholder='Search whatever you want' onChange={(e) => setInputValue(e.target.value)} />
            <Icons.Search fontSize={20} color='black' id='search' />

            <NavLink to='wishlist' style={({ isActive }) => { return { color: isActive ? 'red' : '#fff' } }}>
            <span id={toogle ? 'Movies' : 'MoviesLight'}><Icons.HeartFill fontSize={24} id='wishlist' /></span>
            </NavLink>

            <NavLink to='/signup' style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
              <span id={toogle ? 'Movies' : 'MoviesLight'} style={{ fontSize: '20px', fontFamily: 'fantasy' }}><Icons.PersonFill style={{ border: '2px solid white', borderRadius: '50%', }} size={24} />&nbsp;&nbsp;signup</span>
            </NavLink>
            <Icons.Person size={18} />

            <div id='Color-switcher' onClick={() => setToogle(!toogle)}>
              <div id={toogle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
            </div>
          </div>
        </nav>
        <div className='responsive-scene'>
          <Routes>
            <Route path='' element={<Movies />}></Route>
            <Route path='TvShows' element={<TvShows />}></Route>
            <Route path='Trends' element={<Trends />}></Route>
            <Route path='Pricing' element={<Pricing />}></Route>
            {/* <Route exact path="/" element={<Navbar />} /> */}
            <Route exact path="/seatbooking" element={<PrivateRoute><SeatBooking /></PrivateRoute>} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/bookingconfirmation" element={<BookingConfirmation />} />
            <Route exact path="/moviecard" element={<MovieCard />} />
            <Route exact path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
      </Fragment>
    </Container.Provider>
  )
}

export default Navbar
