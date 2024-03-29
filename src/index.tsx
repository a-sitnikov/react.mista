import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { store, persistor } from "src/store";
import { PersistGate } from "redux-persist/integration/react";

const Root = ({ store }): React.ReactElement => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Root store={store} />);
