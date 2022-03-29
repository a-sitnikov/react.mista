//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import reducer from './reducers'
import './index.css';
import App from './App';
import store from 'src/data/store'

const Root = ({ store }) => (
    <Provider store={store}>
        <App/>
    </Provider>
)

// for github pages
window.hash = "#";

ReactDOM.render(<Root store={store} />,
    document.getElementById('root'));

//registerServiceWorker();
