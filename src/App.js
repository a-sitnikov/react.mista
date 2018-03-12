import React from 'react';
import './App.css';
import NavBar from './components/nav_bar';
import Main from './components/main';

const App = () => (
  <div>
    <NavBar />
    <div id='container'>
      <Main />
    </div>
  </div>
)

export default App;
