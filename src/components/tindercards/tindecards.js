import React, { useContext, useEffect, useState } from "react";
import TinderCard from 'react-tinder-card';
import { Context } from "../../context/context";
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import classes from './tindercards.css'
import { Container } from "@material-ui/core";

export default function TinderCardsList(){
  //  const [data,setData] = useState({});
    const  {onSwipe,onCardLeftScreen,favouriteMovies,userInfo,updateFavContent,burgerToggle,updateApiData,} = useContext(Context);
    const [toggle,setToggle] = useState(false);

    const [data,setData] = useState(false);
  let totalDatafromApi=[];
useEffect(()=>{
for(let i=1;i<=20;i++){
/*   https://api.themoviedb.org/3/discover/movie?api_key=9844cfc5ebe1ef0bc36f59c086ee4ef0&with_genres=12*/
var url = "https://api.themoviedb.org/3/movie/popular?api_key=9844cfc5ebe1ef0bc36f59c086ee4ef0&language=en-US&page="+i;
//  console.log(url)
fetch(url).then(fetcheddata=>fetcheddata.json()).then(
jsondata=>{
 totalDatafromApi = [...totalDatafromApi,...jsondata.results];
 if(i===20){
 setData(totalDatafromApi);
}
}
)
}
console.log("totally",totalDatafromApi);
},[]);
  

const filtey = (item,index)=>{
  let isItem=true;
  for(let i=0;i<favouriteMovies.length;i++){
            if(favouriteMovies[i].id===item.id){
              isItem=false;
              break;
            }
  }
  if(isItem){
  return <div key={item.id} className={burgerToggle?"hide":"img-ctnr"}
   style={{position:"absolute"}}
   >
        <TinderCard  onSwipe={(dir)=>onSwipe(dir,item)} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up','down']}>
                    <div >
                      <img style={{borderRadius:"10px"}} width="400" height="250" className="image" src={"https://image.tmdb.org/t/p/w500/"+item.backdrop_path} alt="movie poster"/>
                      <p className="desc" style={{position:"absolute",top:"1%"}}><h3>overview</h3>{item.overview}</p> 
                          <div style={{position:"absolute",top:"88%"}}>
                            <div className="title-rating">
                            <span className="title">{item.title}</span>
                      <span 
                      className="fav-btn"
                      // style={{paddingLeft:"3rem"}}
                      > ❤️ : {item.vote_average}</span>
                            </div>
                 
                      </div>  
                     </div>
        </TinderCard></div>
  }
  else{
    let tempData = data;
    tempData.splice(index,1);
    setData(tempData);
  }
}

  /*    useEffect(()=>{
        if(totalDatafromApi!==null && totalDatafromApi.length>=1 && favouriteMovies.length>=1){
          console.log(favouriteMovies.length);
          totalDatafromApi = totalDatafromApi.filter((item)=>!favouriteMovies.includes(item));
         setData(totalDatafromApi)
        }
      },[favouriteMovies.length])
   
    */
     console.log("data",data,favouriteMovies);
  /*  if(data.length>=1 && favouriteMovies.length>=1){
    //  console.log(favouriteMovies.length);
      console.log("total",data,favouriteMovies);
     // totalDatafromApi = data;
     data = data.filter((item)=>{
       for(let i=0;i<favouriteMovies.length;i++){
         if(favouriteMovies[i].id===item.id)
         return false;
       }
       return true;
     });
    
     
     console.log("afterremoval",data)
     //setData(totalDatafromApi)
    }
    */
  
    const removeLastItem=(direction)=>{
      onSwipe(direction,data[data.length-1]);
      let afterData =data;
      afterData.pop();
      setData(afterData); 
      setToggle(!toggle);
    }

  return (<>
        {toggle?"":""}
        {data?"":""}

    <div className="card-ctnr" >
        {
        (data!==null&&data.length>=1)?
        data.map((item,index)=>{
        return filtey(item,index);
        }):(<div className="loader"></div>)
        }
                <hr className="hr-util"/>
          <div className={burgerToggle?"hide":"btn-ctnr"}>
            <div className="btn left" onClick={()=>{
              removeLastItem("left");
            }}>
                <CloseIcon style={{color:"red"}}/>
            </div>
            <div className="btn right" onClick={()=>{
              removeLastItem("right");
            }} >
            <FavoriteIcon style={{color:"green"}}/>
        </div>
        </div>
    </div>
      </>
  );

}