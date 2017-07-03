import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import Comic from './Comic'
import Home from './../components/Home'
import Nav from './../components/Nav'
import { getChapters } from './../actions/Actions'

import './App.css';

class Header extends Component {
  componentDidMount () {
      this.props.getChapters()
  }
  render () {
    return (
      <div className="App-header tradeWinds">
        <h1>Shifters</h1>
        <h3>by Bruno Roncada</h3>
      </div>
    )
  }
}

const HeaderContainer = connect(null, {
  getChapters
})(Header);

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      chapters: {}
    }
    
    this.ComicComponent = this.ComicComponent.bind(this)

  }

  ComicComponent (props) {
    return <Comic chapters={ this.props.chapters } { ...props } />
  }

  render() {
    return (
      <div className="App">
        <HeaderContainer />
        <Nav chapters={ this.state.chapters } />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/chapter/:chapterId" component={ this.ComicComponent } />
          <Route component={ this.HomeComponent } />
        </Switch>
      </div>
    );
  }
}

export default App;
