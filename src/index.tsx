import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "src/store";
import App from "./App";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      throwOnError: (error) => {
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
        return false;
      },
    },
  },
});

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
