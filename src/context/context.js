import React, { createContext,useState ,useEffect} from "react";
import axios from 'axios';
import * as queryString from 'query-string';
import { useHistory } from "react-router-dom";
import { refreshTokenSetup } from "../utils/refreshToken";
import { useGoogleLogin,useGoogleLogout } from "react-google-login";

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
  axios.post("http://localhost:5000/users/favmovies",{'id':uid}).then(user=>{
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
      `Failed to login. 😢 `
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

     await axios.post('http://localhost:5000/users/add', newUser)
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
      axios.post('http://localhost:5000/users/addupdate',updateData)
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
        axios.post("http://localhost:5000/users/removeupdate",removeData)
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




















//  const userData = useUserInfo();
      
       /*
     redirects to google OAuth verification 
       */
   /* const googleLoginUrl=()=>{
      const stringifiedParams = queryString.stringify({
        client_id: '573562446882-mvoalejq05ef8qbsipm1eto7ib19iehh.apps.googleusercontent.com',
        redirect_uri: 'http://localhost:3000/',
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
      });
      const googleLoginLink = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
      return googleLoginLink;
    }
    */

     

  /*
  on swiping the card either left to right 
  */
  /*  const onSwipe = (direction,item) => {
        console.log(direction,userInfo);
        const updateData = {
          //send user id from here
          id:userInfo.id,
          favdata:item,
        }
        if(direction==="right"){
          console.log("right swiper",updateData);
          axios.post('http://localhost:5000/users/addupdate',updateData)
  .then(res => console.log(res.data));
        }
      }

      */

      
    /*
    to fetch codefrom redirect link  after google login signin
    */
  /* const googleDigestCode = ()=>{
    const urlParams = queryString.parse(window.location.search);
    if (urlParams.error) {
      console.log(`An error occurred: ${urlParams.error}`);
    } else {
      console.log(`The code is: ${urlParams.code}`);
     return getAccessTokenFromCode(urlParams.code);
    }
   }
*/
   /*
     for receiving access token for a user
   */
 /*  async function getAccessTokenFromCode(code) {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id:'573562446882-mvoalejq05ef8qbsipm1eto7ib19iehh.apps.googleusercontent.com',
        client_secret:'fRp9wtTtIyhRjytuIev_2AcI',
        redirect_uri: 'http://localhost:3000/',
        grant_type: 'authorization_code',
        code,
      },
    });
    console.log("access-token",data); // { access_token, expires_in, token_type, refresh_token }
     // getAccessTokenFromCode(urlParams.code);
 //   setUserToken(userToken);
    return getGoogleUserInfo(data.access_token);
    return data.access_token;
  };
  */
  /*
  fetches userData
  */
 /* async function getGoogleUserInfo(access_token) {
   
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("user info",data); // { id, email, given_name, family_name }
    setUserInfo(data);
    createUserInMongoDB(data);
    return data; 
  };
*/