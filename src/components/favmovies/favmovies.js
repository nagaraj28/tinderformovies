import React, { useContext ,useEffect} from "react";
import { Context } from "../../context/context";
import classes from "./favmovies.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function FavMovies(){
    const {favouriteMovies,userInfo,updateFavContent,deleteFromFavourites} = useContext(Context);
        console.log("favmovies data",favouriteMovies)
        let counter=0;
        //updateFavContent(userInfo.googleId);
        useEffect(()=>{
            updateFavContent(userInfo.googleId);
        },[])
        useEffect(()=>{
            updateFavContent(userInfo.googleId);
        },[counter])
    return (
    <div className="cardslist" >
        {
                     (favouriteMovies.length>0)?(favouriteMovies.map(movie=>{
                        return   <div >
                        <img style={{borderRadius:"10px"}} width="400" height="200" className="image" src={"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path} alt="movie poster"/>
                            <div style={{position:"",top:"90%"}}>
                        <span>{movie.title}</span>
                        
                        <span style={{paddingLeft:"3rem"}}> ❤️ : {movie.vote_average}</span>
                        <DeleteForeverIcon onClick={(movie)=>{
                            console.log("deleing : ",movie)
                            deleteFromFavourites(movie);
                        counter++;
                        }} style={{width:"150px",color:"",paddingLeft:"160px",marginTop:"10px",marginBottom:"10px",marginLeft:"50px"}}/>
                        <br/>
                        </div>  
                       </div>
                    })):<h2>nothing there</h2>
                    
        }
    </div>
    );
}