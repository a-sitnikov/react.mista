import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App';
import reducer from './reducers'

it('renders without crashing', () => {
  const div = document.createElement('div');

  const store = createStore(
    reducer,
  )

  const appElem = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )

  ReactDOM.render(appElem, div);
  ReactDOM.unmountComponentAtNode(div);
});
