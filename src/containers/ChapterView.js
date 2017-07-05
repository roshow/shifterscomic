import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import IconNavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { getPages } from './../actions/Actions'

import ComicPages from './../components/ComicPages'
import PaperNav from './../components/PaperNav'

class ChapterView extends React.Component {

  componentDidMount () {
    console.log(this.props.match.params)
    this.props.getPages(this.props.match.params.chapterId)
  }

  componentWillReceiveProps (nextProps) {
    // Without the conditional this becomes an infinite loop, LOL SMH
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
      <div className="ChapterView" style={{ maxWidth: '772px', margin: 'auto', textAlign: 'left' }}>
        
        <FlatButton
          label="Go to Page View"
          containerElement={<Link to={`/chapter/${ chapterId }/page/0`} />}
        />

        <PaperNav>
          {
            previousChapter && <Link to={ `/chapter/${ previousChapter.number }` }><IconNavigationArrowBack /></Link>
          }
          &nbsp;
          <span className="tradeWinds">Chapter { chapterId }: { chapter.title }</span>
          &nbsp;
          {
            nextChapter && <Link to={ `/chapter/${ nextChapter.number }` }><IconNavigationArrowForward /></Link>
          }
        </PaperNav>
        
        <ComicPages
          pages={ this.props.pages }
          toBeContinued={ !nextChapter }
        />
        
        {
          nextChapter && <PaperNav>
            <span className="tradeWinds" id="nextChapter">Next Chapter</span>
            &nbsp;
            <Link to={ `/chapter/${ nextChapter.number }` }><IconNavigationArrowForward /></Link>
          </PaperNav>
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
})(ChapterView)