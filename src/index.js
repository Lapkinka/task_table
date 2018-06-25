import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import logger from './middlewars/logger'
import {Provider} from 'react-redux'

const enhancer = applyMiddleware(thunk,logger)
const store = createStore(reducers,{},enhancer);
window.store = store;

ReactDOM.render(<Provider store = {store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();