import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoggedUser from './logged_user'
import LoginForm from './login_form'

import { checkLogin } from '../../actions/login'

class Login extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(checkLogin());        
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

const mapStateToProps = state => {
    const {
        isFetching,
        error,
        userid,
        username,
        hashkey
    } = state.login

    const res = {
        error,
        userid,
        username,
        hashkey,
        isFetching
    }

    return res;
}

export default connect(mapStateToProps)(Login);