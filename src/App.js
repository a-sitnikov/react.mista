import React from 'react';
import './App.css';
import NavBar from './components/nav_bar';
import Container from './components/container';
import NavBarFooter from './components/nav_bar_footer';

const App = () => (
  <div>
    <NavBar />
    <Container />
    <NavBarFooter />
  </div>
)

export default App;
