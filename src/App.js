import React from 'react';
import NavBar from './components/nav_bar';
import Container from './components/container';
import NavBarFooter from './components/nav_bar_footer';
import TooltipsList from './components/extensions/tooltips_list';

const App = () => {
 
  let theme = 'theme-yellow';
  //let theme = 'theme-lightgray';
 
  return (
    <div className = {theme}>
      <NavBar />
      <Container />
      <NavBarFooter />
      <TooltipsList />
    </div>
  )
}

export default App;
