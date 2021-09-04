import React from "react";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import FavoriteIcon from '@material-ui/icons/Favorite';
import classes from "./footer.css";

export default function Footer(){

    return <div className="footer-ctnr">
                <div className="sub-cntr">
                    <div className="footer-txt">
                        <p>Made with <FavoriteIcon style={{color:"red",fontSize:"14px",marginTop:"2px"}}/> by Nagaraj</p>
                    </div>
                    <ul className="socialmedia-icons">  
                          <li className="social-icon">
                                <a href="https://github.com/nagaraj28" target="_blank">
                            <GitHubIcon style={{color:"black"}}/>
                                </a>
                            </li>
                            <li className="social-icon">
                                <a href="https://www.linkedin.com/in/nagaraju-rathna-503770146/" target="_blank">
                                <LinkedInIcon style={{color:"black"}}/>
                                </a>
                            </li>
                            <li className="social-icon">
                                <a href="https://twitter.com/nagarajr28" target="_blank">
                                <TwitterIcon style={{color:"black"}}/>
                                </a>
                            </li>
                    </ul>

                </div>
    </div>
    
}