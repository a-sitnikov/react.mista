//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import NavBar from './components/nav_bar';
import Container from './components/container';
import NavBarFooter from './components/nav_bar_footer';
import TooltipsList from './components/extensions/tooltips_list';
import Options from './components/options';

import { readOptions } from 'src/actions/options'

import type { State } from 'src/reducers'
import type { DefaultProps } from 'src/components'

type StateProps = {
  theme: string   
}

type Props = StateProps & DefaultProps

class App extends Component<Props> {
 
  constructor(props) {
    super(props);
    // for github pages
    window.hash = '#';
    props.dispatch(readOptions());
  }

  componentWillMount() {
      const { theme } = this.props;
      if (document.body)
        document.body.className = theme;
  }
  
  componentWillReceiveProps(props) {
      const { theme } = props;
      if (document.body)
        document.body.className = theme;
  }

  render() {
    return (
      <div id="app">
        <NavBar />
        <Container />
        <NavBarFooter />
        <TooltipsList />
        <Options />
      </div>
    )
  }
}

const mapStateToProps = (state: State): StateProps => {

    return {
        theme: state.options.items.theme
    }
}

export default connect(mapStateToProps)(App);
