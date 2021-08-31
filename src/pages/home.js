import React from "react";
import SwipeButtons from "../components/buttons/buttons";
import NavBar from "../components/navbar/navbar";
import TinderCardsList from "../components/tindercards/tindecards";
import FavMovies from "../components/favmovies/favmovies";

export default function Home(){

return (<>
    <NavBar/>
    <TinderCardsList/>
    <SwipeButtons/>
</>)
}