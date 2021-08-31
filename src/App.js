import React from "react";
import {Switch,Route } from "react-router-dom";
import FavMovies from "./components/favmovies/favmovies";
import NavBar from "./components/navbar/navbar";
import Login from "./components/signin/login";
import Home from "./pages/home";

function App() {
  return (<>
  <Switch>
  <Route exact path="/login">
  <Login/>
</Route>
<Route exact path="/">
  <Home/>
</Route>
<Route exact path="/savedmovies">
  <NavBar/>
  <FavMovies/>
</Route>
  </Switch>
   </>
  );
}
export default App;
