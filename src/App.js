//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import NavBar from './components/nav_bar';
import Container from './components/container';
import NavBarFooter from './components/nav_bar_footer';
import TooltipsList from './components/extensions/tooltips_list';

import type { State } from 'src/reducers'

type StateProps = {
  theme: string   
}

class App extends Component<StateProps> {
 
  constructor(props) {
    super(props);
    // for github pages
    window.hash = '#';
  }

  render() {
    const { theme } = this.props;

    return (
      <div className = {theme}>
        <NavBar />
        <Container />
        <NavBarFooter />
        <TooltipsList />
      </div>
    )
  }
}

const mapStateToProps = (state: State): StateProps => {

    return {
        theme: state.options.theme
    }
}

export default connect(mapStateToProps)(App);
