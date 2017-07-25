import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { getChapters } from './../actions/Actions'

import './Header.css';

class Header extends Component {
  componentDidMount () {
      this.props.getChapters()
  }
  render () {
    return (
      <div className="Header tradeWinds">
        <Link to="/">
          <h1>Shifters</h1>
          <h3>by Bruno Roncada</h3>
        </Link>
      </div>
    )
  }
}

export default connect(null, {
  getChapters
})(Header);