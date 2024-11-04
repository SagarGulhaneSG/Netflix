import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const [apiData,setData] = useState({
    name :"",
    key:"",
    type:"",
    published_at:""
  });

  useEffect(  ()=>{
    
    const getData =async () =>{
      const api = `https://api.themoviedb.org/3/movie/${id}/videos?`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzE5N2Q3OTA4Y2NlZGRhMTk0YzQ3MzcwYjRkZDI3ZiIsIm5iZiI6MTczMDIxMjYwNS45MjIxNTUsInN1YiI6IjY3MjBmMjEzMWVhMzM5MjgyOTdkZWRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1XzgwhEpcmje7jp7OgHp-gsnpuqPJGk6skJTN7djK4'
      }
    };

    const response = await fetch(api,options);
    const data = await response.json();
    

    setData(data.results[0])
    }

    getData();
  },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate("/")}}/>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}` }frameBorder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player