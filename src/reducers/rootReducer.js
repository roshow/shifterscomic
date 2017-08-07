import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import chapters from './chapters';
import pages from './pages';

const lastChapter = (state=1, { type, payload }={}) => {
  switch (type) {
    case 'GET_CHAPTERS_RECEIVED':
      return parseInt(Object.keys(payload.chapters).slice(-1)[0], 10)
    default:
      return state
  }
}

const currentChapter = (state=1, { type, payload }={} ) => {
  switch (type) {

    case '@@router/LOCATION_CHANGE':

      const regexTest = /^\/chapter\/(\d+)\//.exec(payload.pathname)

      if (!regexTest) {
        return state
      }

      return parseInt(regexTest[1], 10)

    default:
      return state;
  }
};

const currentPage = (state=1, { type, payload }={} ) => {
  switch (type) {

    case '@@router/LOCATION_CHANGE':

      const regexTest = /^\/chapter\/(\d+)\/page\/(\d+)$/.exec(payload.pathname)

      if (!regexTest) {
        return state
      }

      return parseInt(regexTest[2], 10)

    default:
      return state;
  }
};


const rootReducer = combineReducers({
  chapters,
  pages,
  currentChapter,
  currentPage,
  lastChapter,
  router: routerReducer,
});


export default rootReducer;
