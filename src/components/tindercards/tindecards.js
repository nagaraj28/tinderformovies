import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
import classes from './tindercards.css'

export default function TinderCardsList(){
    const [data,setData] = useState(null);

    useEffect(()=>{
       fetch("https://api.themoviedb.org/3/discover/movie?api_key=9844cfc5ebe1ef0bc36f59c086ee4ef0&with_genres=12").then(fetcheddata=>fetcheddata.json()).then(
         jsondata=>{
           setData(jsondata);
         }
       );
    },[]);
    console.log(data);

    
  return (
    <div style={{width:"350px",margin:"100px auto"}}>
        {
        data!==null?data.results.map(item=>{
        return <TinderCard style={{position:"absolute"}}>
                      <div className="img-ctnr">
                      <img style={{position:"absolute"}} src={"https://image.tmdb.org/t/p/w500/"+item.backdrop_path} alt="movie poster"/>
                      </div>
          </TinderCard>
        }):"end of image"
        }
    </div>
  );

}