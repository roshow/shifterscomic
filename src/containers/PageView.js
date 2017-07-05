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


class PagView extends React.Component {

  componentDidMount () {
    console.log(this.props.match.params)
    this.props.getPages(this.props.match.params.chapterId)
  }

  componentWillReceiveProps (nextProps) {
    // If component is already loaded and it's a new chapter, we have to call an action to load the new 
    // chapter pages into the app state.
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
    const pageId = this.props.match.params.pageId === 'lastpage' ? this.props.pages.length - 1 : parseInt(this.props.match.params.pageId, 10)
    const chapterId = parseInt(this.props.match.params.chapterId, 10);
    const chapter = this.props.chapters[chapterId] || {}


    // Default nextPageUrl it the WorkInProgress component, so that it will always be the last destination if no other page is available.
    // This also means there will always be a "nextPage" arrow in this component
    let nextPageUrl = `/chapter/${ chapterId }/page/workinprogress`

    if ( pageId + 1 < this.props.pages.length ) {
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
        
        <FlatButton
          label="Go to Chapter View"
          containerElement={<Link to={`/chapter/${ chapterId }`} />}
        />
        
        <PaperNav>
          {
            previousPageUrl && <Link to={ previousPageUrl }><IconNavigationArrowBack /></Link>
          }
          <span className="tradeWinds">Chapter { chapterId }: { chapter.title } , { pageId === 0 ? 'Cover' : `Page ${pageId}` }</span>
          <Link to={ nextPageUrl }><IconNavigationArrowForward /></Link>
        </PaperNav>

        <Link to={ nextPageUrl }><PaperImg src={ this.props.pages[pageId] } /></Link>

        <PaperNav>
          {
            previousPageUrl && <Link to={ previousPageUrl }><IconNavigationArrowBack /></Link>
          }
          <span className="tradeWinds">Chapter { chapterId }: { chapter.title } , { pageId === 0 ? 'Cover' : `Page ${pageId}` }</span>
          {
            nextPageUrl && <Link to={ nextPageUrl }><IconNavigationArrowForward /></Link>
          }
        </PaperNav>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    chapters: state.chapters,
    pages: state.pages
  }
}

export default connect(mapStateToProps, {
  getPages
})(PagView)