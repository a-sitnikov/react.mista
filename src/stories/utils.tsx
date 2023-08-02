import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Container } from 'react-bootstrap';

import { RootState } from 'src/store';
import { setupStore } from 'src/tests/test-utils';

export const wrapper = (node: React.ReactNode, preloadedState: Partial<RootState> = {}) => {
  
  const store = setupStore(preloadedState);
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Container>
          {node}
        </Container>
      </MemoryRouter>
    </Provider>
  )
}
