import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import PaperImg from './../components/PaperImg';
import PaperNav from './../components/PaperNav';

const WorkInProgress = props => {

  // Returns to the last page of the last chapter
  const chapters = Object.keys(props.chapters)
  const chapterId = chapters[chapters.length - 1]
  

  return (
    <div className="PageView" style={{ maxWidth: '772px', margin: 'auto', textAlign: 'left' }}>
      
      <FlatButton
        label="Go to Chapter View"
        containerElement={<Link to={`/chapter/${ chapterId }`} />}
      />

      <PaperNav>
        <Link to={`/chapter/${ chapterId }/page/lastpage`} ><IconNavigationArrowBack /></Link>
        <span className="tradeWinds">Work in Progress</span>
      </PaperNav>

      <PaperImg src="/lastpage-tobecontinued.jpeg" />

      <PaperNav>
        <Link to={`/chapter/${ chapterId }/page/lastpage`} ><IconNavigationArrowBack /></Link>
        <span className="tradeWinds">Work in Progress</span>
      </PaperNav>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    chapters: state.chapters
  }
}

export default connect(mapStateToProps)(WorkInProgress)