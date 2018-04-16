//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoggedUser from './logged_user'
import LoginForm from './login_form'

import { checkLoginIfNeeded } from 'src/actions/login'
import { defaultLoginState } from 'src/reducers/login'

import type { State } from 'src/reducers'
import type { DefaultProps } from 'src/components'
import type { LoginState } from 'src/reducers/login'

type Props = LoginState & DefaultProps;

class Login extends Component<Props> {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(checkLoginIfNeeded());        
    }

    render() {

        const { userid, username, error, dispatch } = this.props;
        const logged = userid ? true : false;

        let elem;
        if (logged) 
            elem = <LoggedUser dispatch={dispatch} userId={userid} userName={username} />
        else
            elem = <LoginForm dispatch={dispatch} error={error}/>    

        return elem
    }
}

const mapStateToProps = (state: State): LoginState => {
    
    return state.login || defaultLoginState;
}

export default connect(mapStateToProps)(Login);