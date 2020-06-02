import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {index} from './Components/Pages';
import {NotFound} from './Components/Pages/NotFound'
import Login from './Components/Pages/Login';

export default class Routers extends Component {
  render() {
    return (
      <React.Fragment>
          <Router>
            <Switch>
              <Route path="/" exact component={index}></Route>
              <Route path="/login" exact component={Login}/>
              <Route component={NotFound}/>
              
            </Switch>
          </Router>
      </React.Fragment>
    )
  }
}
