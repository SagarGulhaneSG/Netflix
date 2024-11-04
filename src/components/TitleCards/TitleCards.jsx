import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import Cards_data from "../../assets/cards/Cards_data"
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title,category}) => {

   const cardsRef =useRef();

   const [apiData,setData] = useState([]);

   useEffect(()=>{
    cardsRef.current.addEventListener("wheel",handleWheel)
   },[])

   useEffect( ()=>{

    const dataFetch = async () =>{
      const api = `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`
    
      const options = {
          method: 'GET',
          headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzE5N2Q3OTA4Y2NlZGRhMTk0YzQ3MzcwYjRkZDI3ZiIsIm5iZiI6MTczMDIxMjYwNS45MjIxNTUsInN1YiI6IjY3MjBmMjEzMWVhMzM5MjgyOTdkZWRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1XzgwhEpcmje7jp7OgHp-gsnpuqPJGk6skJTN7djK4'
          }
      }
  
      const response = await fetch(api,options)
      const data = await response.json()
  
   
      setData(data.results)
    }
    dataFetch();
   },[])

   const handleWheel = (event)=>{
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
   }
  return (
    <div className='Title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
    <div className='card-list' ref={cardsRef}>
      {apiData.map((card,index)=>{
        return <Link to={`/player/${card.id}`} className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
        </Link>
      }
      )}
    </div>
    </div>
  )
}

export default TitleCards