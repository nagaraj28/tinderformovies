import React from "react";
import classes from "./buttons.css"
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';




export default function SwipeButtons(){

    return (
 <div className="btn-ctnr">
            <div className="btn left">
                <CloseIcon style={{color:"red"}}/>
            </div>
            <div className="btn right" >
            <FavoriteIcon style={{color:"green"}}/>
        </div>
        </div>
       
    )

}