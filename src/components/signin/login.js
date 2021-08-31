import React, { useContext } from "react";
import { Context } from "../../context/context";
import {GoogleLogin} from "react-google-login";

export default function Login(){

        const {onSuccess,onFailureLogin} =useContext(Context);
       // const googleLink =  googleLoginUrl();
      const clientId='573562446882-mvoalejq05ef8qbsipm1eto7ib19iehh.apps.googleusercontent.com';
    
    return (
            <div>
                        <GoogleLogin
                        clientId={clientId}
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFailure={onFailureLogin}
                        cookiePolicy={'single_host_origin'}
                        style={{ marginTop: '100px' }}
                        isSignedIn={true}
                        />
            </div>
        
    )
}