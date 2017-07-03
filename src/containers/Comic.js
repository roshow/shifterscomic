import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import IconNavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { getPages } from './../actions/Actions'

import ComicPages from './../components/ComicPages'

import './Comic.css'


class Comic extends React.Component {

  componentDidMount () {
    this.props.getPages(this.props.match.params.chapterId)
  }

  componentWillReceiveProps (nextProps) {
    const newChapterId = nextProps.match.params.chapterId
    if (newChapterId !== this.props.match.params.chapterId) {
      this.props.getPages(newChapterId)
    }
  }

  componentWillUpdate () {
    // Scroll to top when loading a new comic
    window.scrollTo(0,0)
  }

  render () {

    const chapterId = parseInt(this.props.match.params.chapterId, 10);
    const chapter = this.props.chapters[chapterId] || {}
    const nextChapter = this.props.chapters[chapterId+1]
    const previousChapter = this.props.chapters[chapterId-1]

    return (
      <div className="Comic">

        <Paper zDepth={2} style={{margin:"10px auto", padding: "10px 0", maxWidth: "772px" }} className="Comic-nav">
          {
            previousChapter && <Link to={ `/chapter/${ previousChapter.number }` }><IconNavigationArrowBack /></Link>
          }
          &nbsp;
          <span className="tradeWinds">Chapter { chapterId }: { chapter.title }</span>
          &nbsp;
          {
            nextChapter && <Link to={ `/chapter/${ nextChapter.number }` }><IconNavigationArrowForward /></Link>
          }
        </Paper>
        
        <ComicPages
          pages={ this.props.pages }
          toBeContinued={ !nextChapter }
        />
        
        {
          nextChapter && <Paper zDepth={2} style={{margin:"10px auto", padding: "10px 0", maxWidth: "772px" }} className="Comic-nav">
            <span className="tradeWinds" id="nextChapter">Next Chapter</span>
            &nbsp;
            <Link to={ `/chapter/${ nextChapter.number }` }><IconNavigationArrowForward /></Link>
          </Paper>
        }
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chapters: state.chapters,
    pages: state.pages
  }
}

export default connect(mapStateToProps, {
  getPages
})(Comic)