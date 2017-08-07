import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import IconNavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { getPages } from './../actions/Actions'

import PaperImg from './../components/PaperImg'
import PaperNav from './../components/PaperNav'
import PagesButton from './../components/PagesButton'

import './PageView.css';

const PageNav = ({ chapterId, pageId, previousPageUrl, nextPageUrl }) => (
  <PaperNav className="PagView-Nav">
            
    <span className="navCell">{ previousPageUrl && <Link className="navCell" to={ previousPageUrl }><IconNavigationArrowBack /></Link> }</span>

    <span className="tradeWinds navCell">Chapter { chapterId }, { pageId === 0 ? 'Cover' : `Page ${pageId}` }</span>

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
        
        <section style={{ display: 'flex'}}>
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
            containerElement={<Link to={`/chapter/${ this.props.lastChapter }/page/lastpage`} />}
          />      
        </section>
        
        <PageNav
          chapterId={ chapterId }
          pageId={ pageId }
          nextPageUrl={ nextPageUrl }
          previousPageUrl={ previousPageUrl }
        />

        <Link to={ nextPageUrl }><PaperImg src={ imgUrl } /></Link>

        <PageNav
          chapterId={ chapterId }
          pageId={ pageId }
          nextPageUrl={ nextPageUrl }
          previousPageUrl={ previousPageUrl }
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