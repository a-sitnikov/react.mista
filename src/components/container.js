//@flow
import { HashRouter, Routes, Route } from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux'

import TopicsList from './topics_list'
import Topic from './topic'
import Options from './options'
import { clearTooltipsIfNeeded } from 'src/actions/tooltips'

import type { DefaultProps } from 'src/components'

class Container extends Component<DefaultProps> {

  onClick = (e: SyntheticEvent<HTMLElement>) => {
    const { dispatch } = this.props;
    dispatch(clearTooltipsIfNeeded());
  }

  render() {

    const routes =
      <Routes>
        <Route path='/' element={<TopicsList />} />
        <Route path='/index.php' element={<TopicsList />} />
        <Route path='/topic.php' element={<Topic />} />
        <Route path='/options.php' element={<Options />} />   
      </Routes>

    if (window.hash)

      return (
        <div onClick={this.onClick} style={{ flex: "auto" }}>
          <div className="container" >
              {routes}
          </div>
        </div>
      )

    else
      return (
        <div onClick={this.onClick} style={{ flex: "auto" }}>
          <div className="container">
            {routes}
          </div>
        </div>
      )
  }

}

export default ( connect()(Container): any );