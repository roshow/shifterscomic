import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChapters } from './../actions/Actions'

import './Header.css';

class Header extends Component {
  componentDidMount () {
      this.props.getChapters()
  }
  render () {
    return (
      <div className="Header tradeWinds">
        <h1>Shifters</h1>
        <h3>by Bruno Roncada</h3>
      </div>
    )
  }
}

export default connect(null, {
  getChapters
})(Header);