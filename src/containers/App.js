import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ChapterView from './ChapterView'
import PageView from './PageView'
import Home from './Home'
import Nav from './Nav'
import Header from './Header'
import WorkInProgress from './WorkInProgress'

import './App.css';


const App = props => (
  <div className="App">
    <Header />
    <Nav />
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/chapter/:chapterId/page/workinprogress" component={ WorkInProgress } />
      <Route path="/chapter/:chapterId/page/:pageId" component={ PageView } />
      <Route path="/chapter/:chapterId" component={ ChapterView } />
      <Route component={ Home } />
    </Switch>
  </div>
)

export default App;
