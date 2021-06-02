//@flow
import { HashRouter, Switch, Route } from 'react-router-dom'
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
      <Switch>
        <Route exact path='/' component={TopicsList} />
        <Route path='/index.php' component={TopicsList} />
        <Route path='/topic.php' component={Topic} />
        <Route path='/options.php' component={Options} />
      </Switch>

    if (window.hash)

      return (
        <div onClick={this.onClick} style={{ flex: "auto" }}>
          <div className="container" >
            <HashRouter>
              {routes}
            </HashRouter >
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