import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import chapters from './chapters';
import pages from './pages';

const rootReducer = combineReducers({
  chapters,
  pages,
  router: routerReducer,
});


export default rootReducer;
