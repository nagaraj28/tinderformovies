import React, { useContext ,useEffect,useState} from "react";
import { Context } from "../../context/context";
import classes from "./favmovies.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from "axios";

export default function FavMovies(){
    const {favouriteMovies,userInfo,updateFavContent,deleteFromFavourites} = useContext(Context);
     //   console.log("favmovies data",favData)
       // updateFavContent(userInfo.googleId);
       const [data,setData]=useState([]);
       const[count,setCount] = useState(true);
        useEffect(()=>{
              updateFavContent(userInfo.googleId);
               axios.post("http://localhost:5000/users/favmovies",{'id':userInfo.googleId}).then(user=>{
                console.log("favourite movies from monngoDB for a user ",user.data.favdata);
                setData(user.data.favdata);
              //setFavouriteMovies(user.data.favdata);
             })
             setCount(true);
        },[count])
        console.log(data)
    return (<>
    <div className="cardslist" >
        {
                     (favouriteMovies.length>0)?(favouriteMovies.map(movie=>{
                        return   <div >
                        <img style={{borderRadius:"10px"}} width="400" height="200" className="image" src={"https://image.tmdb.org/t/p/w500/"+movie.backdrop_path} alt="movie poster"/>
                     {/*   <p className="desc" style={{position:"absolute",top:"1%"}}><h3>overview</h3>{movie.overview}</p> */}
                            <div style={{position:"",top:"90%"}}>
                        <span>{movie.title}</span>.
                        <span style={{paddingLeft:"3rem"}}> ❤️ : {movie.vote_average}</span>
                        <DeleteForeverIcon onClick={()=>{
                            console.log("deleing : ",movie)
                            deleteFromFavourites(movie);    
                            updateFavContent(userInfo.googleId);
                            setCount(!count);
                            console.log(count);
                          //  setCount(!count);
                        }} style={{width:"150px",color:"",paddingLeft:"160px",marginTop:"10px",marginBottom:"10px",marginLeft:"50px"}}/>
                        <br/>
                        </div>  
                       </div>
                    })):<h2>nothing there</h2>
                    
        }
    </div>
    </>
    );
}