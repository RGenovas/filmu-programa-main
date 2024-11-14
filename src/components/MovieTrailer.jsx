import { useEffect, useRef, useState } from "react"
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Link, useParams,useNavigate} from 'react-router-dom'
import './MovieTrailer.css'
import Modal from 'react-modal'
const MovieTrailer = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const key = 'api_key=53c258bb52d305146e19a71e58aa2cc5'
  const [trailer,setTrailer] = useState('')
  const [visible, setVisible] = useState(false)
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      background:'black'
    },
  };

  const goBack = () => {
    window.history.back();
  };

   const fetcTrailer= async() => { try {
              const response = await axios.get(
                // `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`
                `https://api.themoviedb.org/3/movie/${id}/videos?${key}`
              )
              const trailers = response.data.results.filter(
                (video) => video.type === "Trailer"
              );
              setTrailer(`https://www.youtube.com/embed/${trailers[0].key}`)
            } catch(error) {
              
            }
            setVisible(true)
        
          }
    fetcTrailer();
  


   
  return (
    <div className="trailer-container" onClick={goBack}>
           <iframe 
            className="trailer"
            src={trailer}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Trailer"
            ></iframe>
        
    </div>
  )
}

export default MovieTrailer
