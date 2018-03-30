import React from 'react';
import NavBar from './components/nav_bar';
import Container from './components/container';
import NavBarFooter from './components/nav_bar_footer';
import TooltipsList from './components/extensions/tooltips';

const App = () => (
  <div>
    <NavBar />
    <Container />
    <NavBarFooter />
    <TooltipsList />
  </div>
)

export default App;
