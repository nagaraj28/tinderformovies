import React, { createContext,useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { refreshTokenSetup } from "../utils/refreshToken";
import { useGoogleLogin,useGoogleLogout } from "react-google-login";
import { URL } from "../index";

export  const Context =createContext();
export default function ContextProvider({children}){
  const clientId='573562446882-mvoalejq05ef8qbsipm1eto7ib19iehh.apps.googleusercontent.com';

      const [userInfo,setUserInfo] = useState(null);
  const history =useHistory();
  const [favouriteMovies,setFavouriteMovies] = useState([]);
  const [burgerToggle,setBurgerToggle] = useState(false);
  const [profileToggle,setProfileToggle] = useState(false);
  


   /*
  login part

  */


 const updateFavContent = (uid)=>{
   if(!uid){
    uid=userInfo.googleId;
   }
  axios.post(`${URL}/users/favmovies`,{'id':uid}).then(user=>{
    console.log("favourite movies from monngoDB for a user ",user.data.favdata);
  setFavouriteMovies(user.data.favdata);
 })
}

  const onSuccess = (res) => {
    
    console.log('Login Success: currentUser:', res.profileObj);
    createUserInMongoDB(res.profileObj.googleId,res.profileObj.givenName);
    //updateFavContent(res.profileObj.googleId)
  /*  setTimeout(()=>{
    },10000);*/
    //history.push("/");
    updateData(res.profileObj);
    refreshTokenSetup(res);
    history.push("/");

   /* axios.post("http://localhost:5000/users/favmovies",{'id':res.profileObj.googleId}).then(user=>{
        console.log("favourite movies from monngoDB for a user ",user.data.favdata);
      setFavouriteMovies(user.data.favdata);
    })*/
    updateFavContent(res.profileObj.googleId);
   
  
  }
  const onFailureLogin = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.😢,please try again.`
    );
  };
  const {signIn} =  useGoogleLogin({
    clientId:clientId,
    onSuccess,
    onFailureLogin,
    isSignedIn:true,
    cookiePolicy:'single_host_origin',
    accessType:'offline',

 
  })
 


  /*
  sets user data into a state
  */

    function updateData(userData){
      setUserInfo(userData);
    }

       /*
   add user details to mongoDB
  */
  async function createUserInMongoDB(id,name) {
    console.log()
    const newUser = {
      'id':id,
      'username':name,
    }

    console.log("sending user details to create");
    console.log(newUser)
    //console.log(userInfo.googleId);
    //console.log(userInfo.givenName);
    console.log(id);
    console.log(name);

     await axios.post(`${URL}/users/add`, newUser)
  .then(res => console.log(res.data));
  };


    /*
    logout part
    */

    const onLogoutSuccess = () => {
      console.log('Logout made successfully ✌');
      history.push("/login");
      setUserInfo({});
      setFavouriteMovies({});
    };

    const onFailure = ()=>{
      alert("logout failed");
  }
   
   const {signOut} = useGoogleLogout({
       clientId,
       onLogoutSuccess,
       onFailure
   });
 
  const onSwipe = (direction,item) => {
    console.log(direction,userInfo);
    const updateData = {
      //send user id from here
      id:userInfo.googleId,
      favdata:item,
    }
    if(direction==="right"){
     // const newArray = [...favouriteMovies,item];
      //setFavouriteMovies(newArray);
      console.log("right swiper",updateData);
      axios.post(`${URL}/users/addupdate`,updateData)
.then(res => console.log(res.data));
    }
  }
       /*
  on swiping the card  left  
  */
      const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }
      const deleteFromFavourites = (movie)=>{
        const removeData = {
          id:userInfo.googleId,
          favdata:movie,
        }
        axios.post(`${URL}/users/removeupdate`,removeData)
      }
      const burgerToggleUtil = ()=>{
        setBurgerToggle(!(burgerToggle))
      }
      const profileToggleUtil = ()=>{
        setProfileToggle(!(profileToggle))
      }

    return <Context.Provider value={{onSwipe,onCardLeftScreen,updateData,onSuccess,onFailureLogin,onLogoutSuccess,onFailure,signOut,favouriteMovies,userInfo,updateFavContent,deleteFromFavourites,burgerToggle,burgerToggleUtil,profileToggle,profileToggleUtil,signIn}}>
        {children}
    </Context.Provider>
}














