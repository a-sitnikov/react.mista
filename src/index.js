//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

// eslint-disable-next-line 
import { createLogger } from 'redux-logger'

import reducer from './reducers'
import './index.css';
import App from './App';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    //middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

const Root = ({ store }) => (
    <Provider store={store}>
        <App/>
    </Provider>
)

// for github pages
window.hash = "#";

ReactDOM.render(<Root store={store} />,
    document.getElementById('root'));

registerServiceWorker();
