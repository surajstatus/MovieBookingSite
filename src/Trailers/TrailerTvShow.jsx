import { Fragment, React, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import movieTrailer from 'movie-trailer'
import '../Styles/TrailerMovie.css'

function TrailerTvShow({ TvShowTitle }) {
    const [video, setVideo] = useState("");
    const [videoURL, setVideoURL] = useState("");

    function handleSearch() {
        setVideo(TvShowTitle)
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
            <ReactPlayer url={videoURL} controls={true}/>
            </div>
        </Fragment>
    )
}

export default TrailerTvShow
