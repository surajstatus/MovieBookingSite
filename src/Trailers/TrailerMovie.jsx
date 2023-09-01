import { Fragment, React, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import movieTrailer from 'movie-trailer'
import '../Styles/TrailerMovie.css'
import * as Icons from 'react-bootstrap-icons'

function TrailerMovie({ moviesTitle, trailercloseHandler }) {
    const [video, setVideo] = useState("");
    const [videoURL, setVideoURL] = useState("");

    function handleSearch() {
        setVideo(moviesTitle)
        movieTrailer(video).then((res) => {
            setVideoURL(res);
        });
    }
    useEffect(() => {
        handleSearch()
    }, [videoURL])
    return (
        <Fragment>
            <div className='Container'>


            </div>
            <div className='player'>
                <ReactPlayer url={videoURL} controls={true} />

                {/* <div className='trailer-close-btn'>
                    <button  className='x-btn' onClick={trailercloseHandler}><Icons.XLg size={24} /></button>
                </div> */}
            </div>
        </Fragment>
    )
}

export default TrailerMovie
