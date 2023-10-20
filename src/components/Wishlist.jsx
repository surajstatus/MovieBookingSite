import React from 'react'
import '../Styles/Wishlist.css'
import { useState } from 'react'
import NoImage from './No Image.jpg'
import MovieCard from './MovieCard'
import * as Icons from 'react-bootstrap-icons'

const Wishlist = () => {
    
    const wishitem = JSON.parse(localStorage.getItem('wishlistMovie'));

    const [wishitems, setWishitems] = useState(wishitem);
    console.log(wishitems, 'here is love')

    const Images = "https://image.tmdb.org/t/p/w500";

    const [currentMovie, setCurrentMovie] = useState([]);
    const [displayCard, setDisplayCard] = useState(false);

    const movieCardHandler = (movie) => {
        setCurrentMovie(movie);
        setDisplayCard(true);
    }

    const movieCardCloseHandler = () => {
        setCurrentMovie([]);
        setDisplayCard(false);
    }

    const removeWishItem = (id) => {
        const deleteFromWish = wishitems.filter((movie) => movie.id !== id);
        setWishitems([...deleteFromWish]);
    }

    localStorage.setItem('wishlistMovie', JSON.stringify(wishitems));

    return (
        <>
            <div>
                <div className='Heading' align="center" >Your All Time Favorite</div>
                <div className='allwish'>
                    <div className='ws-main'>
                        {wishitems.map((wm) => {

                            return (
                                <div key={wm.id} className='ws-in'>
                                    <div>
                                        <button style={{ cursor: 'pointer', borderRadius: '10px', backgroundColor: 'transparent' }} onClick={() => removeWishItem(wm.id)} >
                                            <Icons.XLg size={30} color='#fff' cursor={'pointer'} className='x-icon' />
                                        </button>
                                        <img src={wm.poster_path ? `${Images}${wm.poster_path}` : NoImage} alt=' ' onClick={() => movieCardHandler(wm)} /></div>
                                    <h3 id={wm.title.length > 28 ? 'smaller-Text' : ' '} /* className={toogle ? "mainColor" : 'secondaryColor'} */>{wm.title}</h3>

                                </div>
                            )
                        })}
                    </div>
                    {/* movie-card   */}
                    <div className="movieCard-popUp" style={{
                        visibility: displayCard ? "visible" : "hidden",
                        opacity: displayCard ? "1" : "0"
                    }}  >
                        <MovieCard currentMovie={currentMovie} movieCardCloseHandler={movieCardCloseHandler} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlist
