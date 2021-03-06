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
          pages={ chapter.pages }
          toBeContinued={ !nextChapter }
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
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chapters: state.chapters
  }
}

export default connect(mapStateToProps, {
  getPages
})(ChapterView)