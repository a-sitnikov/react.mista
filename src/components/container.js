import { HashRouter, Switch, Route } from 'react-router-dom'
import React from 'react';
import TopicsList from './topics_list'
import Topic from './topic/'

const Container = () => (
    <div id='container' style={{ width: "97%", margin: "20px auto 0px auto" }}>
        <HashRouter >
            <div>
                <Route exact path='/' component={TopicsList} />
                <Route path='/index.php' component={TopicsList} />
                <Route path='/topic.php' component={Topic} />
            </div>
        </HashRouter >
    </div>
)

export default Container;