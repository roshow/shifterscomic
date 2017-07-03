import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import Comic from './Comic'
import Home from './Home'
import Nav from './Nav'
import Header from './Header'

import './App.css';


const App = props => (
  <div className="App">
    <Header />
    <Nav />
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/chapter/:chapterId" component={ Comic } />
      <Route component={ Home } />
    </Switch>
  </div>
)

export default App;
