import { HashRouter, Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux'

import TopicsList from './topics_list'
import Topic from './topic'
import Options from './options'
import { clearTooltipsIfNeeded } from '../actions/tooltips'

class Container extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

    }

    onClick() {
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
                <div onClick={this.onClick}>
                    <div className="container" >
                        <HashRouter>
                            {routes}
                        </HashRouter >
                    </div>    
                </div>
            )

        else
            return (
                <div onClick={this.onClick}>
                    <div className="container">
                        {routes}
                    </div>
                </div>
            )
    }

}

export default connect()(Container);