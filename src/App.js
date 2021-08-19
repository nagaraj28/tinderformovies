import React, { useEffect, useState } from "react";
import TinderCard from 'react-tinder-card'
import TinderCardsList from "./components/tindercards/tindecards";
import NavBar from "./components/navbar/navbar";
import SwipeButtons from "./components/buttons/buttons";


function App() {

  return (<>
  <NavBar/>
   <TinderCardsList/>
   <SwipeButtons/>
   </>
  );
}

export default App;
