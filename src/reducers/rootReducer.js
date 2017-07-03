import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import chapters from './chapters';

const rootReducer = combineReducers({
  chapters,
  router: routerReducer,
});


export default rootReducer;
