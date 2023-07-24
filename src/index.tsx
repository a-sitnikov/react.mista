import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import { store } from 'src/store'

const Root = ({ store }): React.ReactElement => (
  <Provider store={store}>
    <App />
  </Provider>
)

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Root store={store} />);