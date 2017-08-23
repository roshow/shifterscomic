import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import PaperImg from './../components/PaperImg';
import PaperNav from './../components/PaperNav';

import './PageView.css';

const WorkInProgress = props => {
  
  return (
    <div className="PageView" style={{ maxWidth: '772px', margin: 'auto', textAlign: 'left' }}>

      <PaperNav className="PagView-Nav">
        <Link to={`/chapter/${ props.lastChapter }/page/lastpage`} className="navCell" ><IconNavigationArrowBack /></Link>
        <span className="navCell">Work in Progress</span>
        <span className="navCell"></span>
      </PaperNav>

      <PaperImg src="/lastpage-tobecontinued.jpeg" />

      <PaperNav className="PagView-Nav">
        <Link to={`/chapter/${ props.lastChapter }/page/lastpage`} className="navCell" ><IconNavigationArrowBack /></Link>
        <span className="tradeWinds navCell">Work in Progress</span>
        <span className="navCell"></span>
      </PaperNav>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    lastChapter: state.lastChapter
  }
}

export default connect(mapStateToProps)(WorkInProgress)