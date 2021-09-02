import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { Context } from "../../context/context";



export default function ProtectedRoute({component:Component,...rest}){
    const {userInfo} = useContext(Context);

    return (
        <Route  {...rest} render={props=>{
            console.log(userInfo)
            if(userInfo!==null && userInfo.googleId){
                return (<Component/>)
            }
            else
            return (<Redirect to={
            {
              pathname:'/login',
              state: {
                from: props.location
              }
            }
          } />)}}  />
        
    )
}