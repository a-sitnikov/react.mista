import { HashRouter, Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import TopicsList from './topics_list'
import Topic from './topic/'

class Container extends Component {

    componentDidMount() {

        // for github pages
        if (window.location.toString().search("github.io") !== -1)
            window.hash = '#';
        else
            window.hash = '';
    }

    render() {

        if (window.hash)

            return (
                <HashRouter >
                    <div id='container' style={{ width: "97%", margin: "20px auto 0px auto" }}>
                        <Route exact path='/' component={TopicsList} />
                        <Route path='/index.php' component={TopicsList} />
                        <Route path='/topic.php' component={Topic} />
                    </div>
                </HashRouter >
            )

        else
            return (
                <div id='container' style={{ width: "97%", margin: "20px auto 0px auto" }}>
                    <Switch>
                        <Route exact path='/' component={TopicsList} />
                        <Route path='/index.php' component={TopicsList} />
                        <Route path='/topic.php' component={Topic} />
                    </Switch>
                </div>
            )
    }

}

export default Container;