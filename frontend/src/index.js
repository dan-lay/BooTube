import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as videoActions from './store/videos';
import * as commentActions from './store/comments';
import * as userActions from './store/users';

// const initialState = {     //THIS IS WRONG!!!!!! Sets session to empty object upon refresh
//   session: null,
//   videos: null,
//   comments: null
// };

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.csrfFetch = csrfFetch;
  window.videoActions = videoActions;
  window.commentActions = commentActions;
  window.userActions = userActions;
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}