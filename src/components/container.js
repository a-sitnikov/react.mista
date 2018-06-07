import { HashRouter, Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import { connect } from 'react-redux'

import TopicsList from './topics_list'
import Topic from './topic'
import FindPage from './find_page'
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

        const { contetnMaxWidth } = this.props;
        let style = {};
        if (contetnMaxWidth) {
            style.maxWidth = contetnMaxWidth;
            style.margin = "auto";
        }    

       const routes =
            <Switch>
                <Route exact path='/' component={TopicsList} />
                <Route path='/index.php' component={TopicsList} />
                <Route path='/topic.php' component={Topic} />
                <Route path='/find.php' component={FindPage} />
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
                <div className="container" onClick={this.onClick}>
                    <div style={style} >
                        {routes}
                    </div>
                </div >
            )
    }

}
const mapStateToProps = (state: State): StateProps => {

    return {
        contetnMaxWidth: state.options.items.contetnMaxWidth,
    }
}

export default connect(mapStateToProps)(Container);