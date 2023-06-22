import { ReactElement, useLayoutEffect } from 'react';
import { HashRouter } from 'react-router-dom'

import NavBar from './components/navigation/nav_bar';
import AppRoutes from './pages/approutes';
import NavBarFooter from './components/navigation/nav_bar_footer';
import TooltipsContainer from './components/tooltips/tooltips_container';
import { useAppSelector } from './store';


const App = (): ReactElement => {

  const theme = useAppSelector(state => state.options.items.theme);

  useLayoutEffect(() => {
    document.body.setAttribute('theme', theme);
  }, [theme])

  return (
    <HashRouter>
      <NavBar />
      <AppRoutes />
      <NavBarFooter />
      <TooltipsContainer />
    </HashRouter>
  );
}

export default App;
