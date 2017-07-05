import React from 'react'
import LazyLoad from 'react-lazyload';
import PaperImg from './PaperImg';

const ComicPages = ({ pages, toBeContinued, height=1000 }) => (
  <section className="comic">
    {
      pages.map((page,i) => (
        <div id={`page${i+1}`} key={i}>
        <LazyLoad height={ height } offset={ height } once key={i}>
          <PaperImg src={ page } />
        </LazyLoad>
        </div>
      ))
    }
    {
      toBeContinued && (
        <LazyLoad height={ 676 } offset={ 676 }>
          <PaperImg src="/lastpage-tobecontinued.jpeg" />
        </LazyLoad>
      )
    }
  </section>
)

export default ComicPages