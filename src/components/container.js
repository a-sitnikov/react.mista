import { HashRouter, Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import TopicsList from './topics_list'
import Topic from './topic'
import SearchPage from './search_page'

class Container extends Component {

    constructor(props) {

        super(props);
        // for github pages
        window.hash = '/#';
    }

    render() {

        const routes =
            <Switch>
                <Route exact path='/' component={TopicsList} />
                <Route path='/index.php' component={TopicsList} />
                <Route path='/topic.php' component={Topic} />
                <Route path='/find.php' component={SearchPage} />
            </Switch>

        if (window.hash)

            return (
                <div className="container">
                    <HashRouter >
                        {routes}
                    </HashRouter >
                </div>
            )

        else
            return (
                <div className="container">
                    {routes}
                </div >
            )
    }

}

export default Container;