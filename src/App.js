import React ,{useEffect, useState} from "react";
import {Switch,Route } from "react-router-dom";
import FavMovies from "./components/favmovies/favmovies";
import NavBar from "./components/navbar/navbar";
import Login from "./components/signin/login";
import Home from "./pages/home";
import ProtectedRoute from "./components/protectroutes/protectroutes";
import { Context } from "./context/context";
import FavouriteMovies from "./pages/favouritemovies";

function App() {
  return (<>
  <Switch>
  <Route exact path="/login">
  <Login/>
</Route>
<ProtectedRoute exact path = "/"
    component = {
      Home
    }
    />
   {
     
    <ProtectedRoute exact path="/savedmovies"  component = {
      FavouriteMovies
    } />

    
  }
  
  </Switch>
   </>
  );
}
export default App;
