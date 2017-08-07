import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

// import createHistory from 'history/createBrowserHistory'

import { ConnectedRouter, routerMiddleware  } from 'react-router-redux'

// import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import rootReducer from './reducers/rootReducer'

import history from './history'

import './index.css';

injectTapEventPlugin();

// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(
      thunk,
      middleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)


ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
document.getElementById('root'));

// registerServiceWorker();
