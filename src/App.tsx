import { ReactElement, useLayoutEffect } from 'react';
import { HashRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import NavBar from './components/navigation/nav_bar';
import AppRoutes from './pages/approutes';
import NavBarFooter from './components/navigation/nav_bar_footer';
import TooltipsContainer from './components/tooltips/tooltips_container';
import { RootState } from './store/store';


const App = (): ReactElement => {

  const theme = useSelector((state: RootState) => state.options.items.theme);

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
