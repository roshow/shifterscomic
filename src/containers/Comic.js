import React from 'react'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import IconNavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import ComicPages from './../components/ComicPages'

import './Comic.css'

var scrollToElement = require('scroll-to-element');

class Comic extends React.Component {

  constructor(props) {
    super(props)
    
    this.getImages = this.getImages.bind(this)

    this.state = {
      pages: [],
      chapterId: parseInt(props.match.params.chapterId, 10),
      chapter: {},
      nextChapter: {},
      previousChapter: {}
    }
  }

  componentDidMount () {
    const { chapterId } = this.state
    const { chapters } = this.props;
    this.getImages().then(images => this.setState({
      pages: images,
      chapter: chapters[chapterId] || {},
      nextChapter: chapters[chapterId+1],
      previousChapter: chapters[chapterId-1]
    }))
  }

  getImages (chapterId) {
    return fetch(`https://cdn.contentful.com/spaces/9ilzxl5twj9p/entries?access_token=51953758c1cf7b123fbb879754de626111cfcf4b45000407be02e94be1b1079d&content_type=page&fields.chapter=${ chapterId || this.state.chapterId }&order=fields.page`)
      .then(r => r.json())
      .then(response => {

        if (!response.items || response.items.length === 0) {
          return window.location.href='/'
        }
        
        const assets = response.includes.Asset
        
        const assetMap = assets.reduce((obj, asset) => {
          obj[asset.sys.id] = asset.fields.file.url
          return obj
        }, {})

        const images = response.items.map(item => assetMap[item.fields.image.sys.id])
        
        return images

      })
  }

  componentWillReceiveProps (nextProps) {
    const chapterId = parseInt(nextProps.match.params.chapterId, 10)
    let state = {
      chapter: nextProps.chapters[chapterId],
      nextChapter: nextProps.chapters[chapterId+1],
      previousChapter: nextProps.chapters[chapterId-1],
    }

    if (chapterId === this.state.chapterId) {
      this.setState(state)
    }
    else {
      this.getImages(chapterId).then(pages => {
        this.setState({
          ...state,
          pages,
          chapterId
        })
      })
    }

  }

  componentWillUpdate () {
    // Scroll to top when loading a new comic
    window.scrollTo(0,0)
  }

  render () {
    console.log('render')
    return (
      <div className="Comic">

        <Paper zDepth={2} style={{margin:"10px auto", padding: "10px 0", maxWidth: "772px" }} className="Comic-nav">
          {
            this.state.previousChapter && <Link to={ `/chapter/${ this.state.previousChapter.number }` }><IconNavigationArrowBack /></Link>
          }
          &nbsp;
          <span className="tradeWinds">Chapter { this.state.chapterId }: { this.state.chapter.title }</span>
          &nbsp;
          {
            this.state.nextChapter && <Link to={ `/chapter/${ this.state.nextChapter.number }` }><IconNavigationArrowForward /></Link>
          }
        </Paper>
        
        <ComicPages
          pages={ this.state.pages }
          toBeContinued={ this.state.chapter && !this.state.nextChapter }
        />
        
        {
          this.state.nextChapter && <Paper zDepth={2} style={{margin:"10px auto", padding: "10px 0", maxWidth: "772px" }} className="Comic-nav">
            <span className="tradeWinds" id="nextChapter">Next Chapter</span>
            &nbsp;
            <Link to={ `/chapter/${ this.state.nextChapter.number }` }><IconNavigationArrowForward /></Link>
          </Paper>
        }
        
      </div>
    )
  }
}

export default Comic 