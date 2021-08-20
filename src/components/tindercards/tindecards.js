import React, { useContext, useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
import { Context } from "../../context/context";
import classes from './tindercards.css'

export default function TinderCardsList(){
    const [data,setData] = useState(null);
    const  {onSwipe,onCardLeftScreen} = useContext(Context)

    useEffect(()=>{
       fetch("https://api.themoviedb.org/3/discover/movie?api_key=9844cfc5ebe1ef0bc36f59c086ee4ef0&with_genres=12").then(fetcheddata=>fetcheddata.json()).then(
         jsondata=>{
           setData(jsondata);
         }
       );
    },[]);
    console.log(data);

    
  return (
    <div className="card-ctnr" >
        {
        data!==null?data.results.map(item=>{
        return <div className="img-ctnr" style={{position:"absolute"}}>
          <TinderCard  onSwipe={(dir)=>onSwipe(dir)} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up','down']}>
                      <div >
                        <img width="480" height="250" className="image" src={"https://image.tmdb.org/t/p/w500/"+item.backdrop_path} alt="movie poster"/>
                        <p className="desc" style={{position:"absolute",top:"1%"}}><h3>overview</h3>{item.overview}</p> 
                            <div style={{position:"absolute",top:"90%"}}>
                        <span>{item.title}</span>
                        <span style={{paddingLeft:"3rem"}}> ❤️ : {item.vote_average}</span><br/>
                        </div>  
                       </div>
          </TinderCard></div>
        }):"end of image"
        }
    </div>
  );

}