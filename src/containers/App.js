import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Comic from './Comic'
import Home from './../components/Home'
import Nav from './../components/Nav'

import './App.css';

const Header = props => <div className="App-header tradeWinds">
  <h1>Shifters</h1>
  <h3>by Bruno Roncada</h3>
</div>

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      chapters: {}
    }
    
    this.ComicComponent = this.ComicComponent.bind(this)
    this.HomeComponent = this.HomeComponent.bind(this)

  }


  componentDidMount () {
    fetch('https://cdn.contentful.com/spaces/9ilzxl5twj9p/entries?access_token=51953758c1cf7b123fbb879754de626111cfcf4b45000407be02e94be1b1079d&content_type=chapter')
      .then(res => res.json())
      .then(response => {

        const assets = response.includes.Asset
        
        const assetMap = assets.reduce((obj, asset) => {
          obj[asset.sys.id] = asset.fields.file.url
          return obj
        }, {})
        
        const chapters = response.items.reduce( (obj, item) => {
           obj[item.fields.number] = {
            ...item.fields,
            img: assetMap[item.fields.cover.sys.id]
          }
           return obj
        }, {})

        this.setState({
          chapters
        })
      })
  }

  ComicComponent (props) {
    return <Comic chapters={ this.state.chapters } { ...props } />
  }

  HomeComponent (props) {
    return <Home chapters={ this.state.chapters } { ...props } />
  }

  render() {
    return (

      <Router>
          <div className="App">
            <Header chapters={ this.state.chapters } />
            <Nav chapters={ this.state.chapters } />
            <Switch>
              <Route exact path="/" component={ this.HomeComponent } />
              <Route path="/chapter/:chapterId" component={ this.ComicComponent } />
              <Route component={ this.HomeComponent } />
            </Switch>
          </div>
      </Router>
    );
  }
}

export default App;
