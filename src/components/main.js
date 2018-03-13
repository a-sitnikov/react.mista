import { Switch, Route } from 'react-router-dom'
import React from 'react';
import TopicsList from './topics_list'
import Topic from './topic'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={TopicsList}/>
      <Route path='/index.php' component={TopicsList}/>
      <Route path='/topic.php' component={Topic}/>
    </Switch>
  </main>
)

export default Main;