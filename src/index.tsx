import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App";
import { store, persistor } from "src/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

const Root = ({ store }): React.ReactElement => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Root store={store} />);
