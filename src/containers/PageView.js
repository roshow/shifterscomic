import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconNavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { getPages } from './../actions/Actions'
import makePageUrl from './../utils/makePageUrl'

import PaperImg from './../components/PaperImg'
import PaperNav from './../components/PaperNav'
import PagesDropDown from './../components/PagesDropDown'

import './PageView.css';

const PageNav = ({ chapterId, pageId, previousPageUrl, nextPageUrl, pages }) => (
  <PaperNav className="PagView-Nav">
            
    <span className="navCell">{ previousPageUrl && <Link className="navCell" to={ previousPageUrl }><IconNavigationArrowBack /></Link> }</span>

    <span className="navCell">Chapter { chapterId }, <PagesDropDown
      chapterId={ chapterId }
      pages={ pages }
      currentPage={ pageId }
      style={ {height: 'auto'}}
      iconStyle={ { top: '-14px', fill: 'black'} }
      labelStyle={{ height: 'auto', lineHeight: 'normal' }}

    /> </span>

    <Link className="navCell" to={ nextPageUrl }><IconNavigationArrowForward /></Link>

  </PaperNav>
)

class PagView extends React.Component {

  componentWillUpdate () {
    // Scroll to top when loading a new comic
    window.scrollTo(0,0)
  }
  render () {
    const chapterId = this.props.currentChapter;
    
    // Because the chapters load async. Need better way to handle defaults
    const chapter = this.props.chapters[chapterId] || { pages: [] }
    const pageId = this.props.match.params.pageId === 'lastpage' ? chapter.pages.length - 1 : this.props.currentPage
    const imgUrl = chapter.pages[pageId] 

    // Default nextPageUrl it the WorkInProgress component, so that it will always be the last destination if no other page is available.
    // This also means there will always be a "nextPage" arrow in this component
    let nextPageUrl = makePageUrl(chapterId, 'workinprogress')

    if ( pageId + 1 < chapter.pages.length ) {
      nextPageUrl = makePageUrl(chapterId, pageId + 1)
    }
    else if ( this.props.chapters[chapterId+1] ) {
      nextPageUrl = makePageUrl(chapterId + 1, 0)
    }

    let previousPageUrl = false

    if (pageId - 1 >= 0) {
      previousPageUrl = makePageUrl(chapterId, pageId - 1)
    }
    else if (chapterId - 1 > 0) {
      previousPageUrl = makePageUrl(chapterId - 1, 'lastpage')
    }

    return (
      <div className="PageView" style={{ maxWidth: '772px', margin: 'auto', padding: '0 10px' }}>
        
        <PageNav
          chapterId={ chapterId }
          pageId={ pageId }
          nextPageUrl={ nextPageUrl }
          previousPageUrl={ previousPageUrl }
          pages={ chapter.pages }
        />

        <Link to={ nextPageUrl }><PaperImg src={ imgUrl } /></Link>

        <PageNav
          chapterId={ chapterId }
          pageId={ pageId }
          nextPageUrl={ nextPageUrl }
          previousPageUrl={ previousPageUrl }
          pages={ chapter.pages }
        />
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    chapters: state.chapters,
    currentChapter: state.currentChapter,
    currentPage: state.currentPage,
    lastChapter: state.lastChapter
  }
}

export default connect(mapStateToProps, {
  getPages
})(PagView)