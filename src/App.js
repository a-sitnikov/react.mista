//@flow
import React, { Component, Fragment, useEffect } from 'react';
import { HashRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import NavBar from './components/nav_bar';
import Container from './components/container';
import NavBarFooter from './components/nav_bar_footer';
import TooltipsList from './components/tooltips/tooltips_list';

import { readOptions } from 'src/data/options/actions'

import type { State } from 'src/reducers'
import type { DefaultProps } from 'src/components'

type StateProps = {
  theme: string
}

type Props = StateProps & DefaultProps

function App(props): Props {

  useEffect(() => {
    document.body.setAttribute('theme', props.theme);
  })

  return (
    <HashRouter>
      <NavBar />
      <Container />
      <NavBarFooter />
      <TooltipsList />
    </HashRouter>
  );
}

const mapStateToProps = (state: State): StateProps => {

  return {
    theme: state.options.items.theme
  }
}

export default connect(mapStateToProps)(App);
