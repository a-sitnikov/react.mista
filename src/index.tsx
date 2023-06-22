import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import { store } from 'src/store'

const Root = ({ store }): ReactElement => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Root store={store} />,
  document.getElementById('root'));