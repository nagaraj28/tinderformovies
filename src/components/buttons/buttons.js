import React, { useContext } from "react";
import classes from "./buttons.css"
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Context } from "../../context/context";




export default function SwipeButtons(){
    const {burgerToggle} =useContext(Context);

    return (
 <div className={burgerToggle?"hide":"btn-ctnr"}>
            <div className="btn left">
                <CloseIcon style={{color:"red"}}/>
            </div>
            <div className="btn right" >
            <FavoriteIcon style={{color:"green"}}/>
        </div>
        </div>
       
    )

}