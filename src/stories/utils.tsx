import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { type RootState } from "src/store";
// eslint-disable-next-line no-restricted-imports
import { setupStore } from "src/tests/test-utils";

export const wrapper = (
  node: React.ReactNode,
  preloadedState: Partial<RootState> = {}
) => {
  const store = setupStore(preloadedState);
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Container>{node}</Container>
      </MemoryRouter>
    </Provider>
  );
};
