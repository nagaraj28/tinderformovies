import React, {  } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextProvider from "./context/context.js"
import {BrowserRouter as Router} from "react-router-dom";
export const URL="https://tinderformovies.herokuapp.com";


ReactDOM.render(
  <Router >

  <ContextProvider>
<React.StrictMode>
  <App />
  </React.StrictMode>
  </ContextProvider>
  </Router>

,
  document.getElementById('root')
 
);

