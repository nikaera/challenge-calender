import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './index.css';
import 'semantic-ui-css/semantic.min.css'

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Show from "./pages/Show"

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route path="/edit" component={Edit}></Route>
      <Route path="/show" component={Show}></Route>
    </Router>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
