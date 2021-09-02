import React ,{useState ,useEffect} from "react";
import SwipeButtons from "../components/buttons/buttons";
import NavBar from "../components/navbar/navbar";
import TinderCardsList from "../components/tindercards/tindecards";
import FavMovies from "../components/favmovies/favmovies";
import { Context } from "../context/context";

export default function Home(){

return (<>
    <NavBar/>
    <TinderCardsList />
</>)
}