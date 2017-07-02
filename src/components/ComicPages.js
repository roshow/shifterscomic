import React from 'react'
import LazyLoad from 'react-lazyload';
import Paper from 'material-ui/Paper';

const muiStyles = {
  paper: {
    maxWidth: '772px',
    width: '100%',
    margin: '15px auto'
  },
  img: {
    width: '100%'
  }
}

const ComicPages = ({ pages, toBeContinued, height=1000 }) => (
  <section className="comic">
    {
      pages.map((page,i) => (
        <div id={`page${i+1}`} key={i}>
        <LazyLoad height={ height } offset={ height } once key={i}>
          <Paper style={ muiStyles.paper } zDepth={2}>
            <img style={ muiStyles.img }src={page} alt='' />
          </Paper>
        </LazyLoad>
        </div>
      ))
    }
    {
      toBeContinued && (
        <LazyLoad height={ 676 } offset={ 676 }>
          <Paper style={ muiStyles.paper } zDepth={2}>
            <img style={ muiStyles.img } src="/lastpage-tobecontinued.jpeg" alt="to be continued" />
          </Paper>
        </LazyLoad>
      )
    }
  </section>
)

export default ComicPages