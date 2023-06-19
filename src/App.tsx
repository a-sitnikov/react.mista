import React, { FC, ReactElement, useLayoutEffect } from 'react';
import { HashRouter } from 'react-router-dom'

import { connect, ConnectedProps } from 'react-redux'
import NavBar from './components/navigation/nav_bar';
import AppRoutes from './pages/approutes';
import NavBarFooter from './components/navigation/nav_bar_footer';
import TooltipsContainer from './components/tooltips/tooltips_container';
import { RootState } from './store/store';

const mapState = (state: RootState) => {

  return {
    theme: state.options.items.theme
  }
}

const connector = connect(mapState);
const App: FC<ConnectedProps<typeof connector>> = ({theme}): ReactElement => {

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

export default connector(App);
