import { Switch, Route } from 'react-router-dom'
import React from 'react';
import TopicsList from './topics_list'
import Topic from './topic'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={TopicsList}/>
      <Route path='/topic' component={Topic}/>
    </Switch>
  </main>
)

export default Main;