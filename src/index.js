import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../src/reducers/index'
import thunk from 'redux-thunk';
import Index from './components/index';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
    )
  )

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Index />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));
