import React, { FC, ReactElement, useEffect } from 'react';
import { HashRouter } from 'react-router-dom'

import { connect, ConnectedProps } from 'react-redux'
import NavBar from './components/navigation/nav_bar';
import Container from './components/container';
import NavBarFooter from './components/navigation/nav_bar_footer';
import TooltipsList from './components/tooltips/tooltips_list';
import { RootState } from './data/store';

const mapState = (state: RootState) => {

  return {
    theme: state.options.items.theme
  }
}

const connector = connect(mapState);
const App: FC<ConnectedProps<typeof connector>> = ({theme}): ReactElement => {

  useEffect(() => {
    document.body.setAttribute('theme', theme);
  }, [theme])

  return (
    <HashRouter>
      <NavBar />
      <Container />
      <NavBarFooter />
      <TooltipsList />
    </HashRouter>
  );
}

export default connector(App);
