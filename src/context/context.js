import React, { createContext } from "react";


export  const Context =createContext();
export default function ContextProvider({children}){

    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
      }
      
      const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }
      

    return <Context.Provider value={{onSwipe,onCardLeftScreen}}>
        {children}
    </Context.Provider>

}
