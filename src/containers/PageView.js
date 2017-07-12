import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconNavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { getPages } from './../actions/Actions'

import PaperImg from './../components/PaperImg'
import PaperNav from './../components/PaperNav'
import PagesButton from './../components/PagesButton'


class PagView extends React.Component {

  componentWillUpdate () {
    // Scroll to top when loading a new comic
    window.scrollTo(0,0)
  }
  render () {
    const chapterId = parseInt(this.props.match.params.chapterId, 10);
    // Because the chapters load async. Need better way to handle defaults
    const chapter = this.props.chapters[chapterId] || { pages: [] }
    const pageId = this.props.match.params.pageId === 'lastpage' ? chapter.pages.length - 1 : parseInt(this.props.match.params.pageId, 10)
    const imgUrl = chapter.pages[pageId] 
    const lastChapterId = Object.keys(this.props.chapters).slice(-1)

    // Default nextPageUrl it the WorkInProgress component, so that it will always be the last destination if no other page is available.
    // This also means there will always be a "nextPage" arrow in this component
    let nextPageUrl = `/chapter/${ chapterId }/page/workinprogress`

    if ( pageId + 1 < chapter.pages.length ) {
      nextPageUrl = `/chapter/${ chapterId }/page/${ pageId + 1 }`
    }
    else if ( this.props.chapters[chapterId+1] ) {
      nextPageUrl = `/chapter/${ chapterId + 1 }/page/0` 
    }

    let previousPageUrl = false

    if (pageId - 1 >= 0) {
      previousPageUrl = `/chapter/${ chapterId }/page/${ pageId - 1 }`
    }
    else if (chapterId - 1 > 0) {
      previousPageUrl = `/chapter/${ chapterId - 1 }/page/lastpage`  
    }

    return (
      <div className="PageView" style={{ maxWidth: '772px', margin: 'auto', textAlign: 'left' }}>
        
        <div style={{ display: 'flex'}}>
          <PagesButton
            chapterId={ chapterId }
            pages={ chapter.pages }
          />

          <FlatButton
            label="First Page"
            containerElement={<Link to="/chapter/1/page/1" />}
          />

          <FlatButton
            label="Latest Page"
            containerElement={<Link to={`/chapter/${ lastChapterId }/page/lastpage`} />}
          />        
        </div>
        
        <PaperNav>
          {
            previousPageUrl && <Link to={ previousPageUrl }><IconNavigationArrowBack /></Link>
          }
          <span className="tradeWinds">Chapter { chapterId }: { chapter.title } , { pageId === 0 ? 'Cover' : `Page ${pageId}` }</span>
          <Link to={ nextPageUrl }><IconNavigationArrowForward /></Link>
        </PaperNav>

        <Link to={ nextPageUrl }><PaperImg src={ imgUrl } /></Link>

        <PaperNav>
          {
            previousPageUrl && <Link to={ previousPageUrl }><IconNavigationArrowBack /></Link>
          }
          <span className="tradeWinds">Chapter { chapterId }: { chapter.title } , { pageId === 0 ? 'Cover' : `Page ${pageId}` }</span>
          <Link to={ nextPageUrl }><IconNavigationArrowForward /></Link>
        </PaperNav>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    chapters: state.chapters
  }
}

export default connect(mapStateToProps, {
  getPages
})(PagView)