//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import ErrorElem from '../core/error'
import { doLoginIfNeeded } from 'src/actions/login'

import type { DefaultProps } from 'src/components'

type LoggedUserProps = {
    error: string
}

type Props = LoggedUserProps & DefaultProps;

class LoginForm extends Component<Props> {

    onLogin;
    refs: {username: any, password:any};

    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(event) {

        event.preventDefault();

        const { dispatch } = this.props;

        const params = {
            username: this.refs.username.value,
            password: this.refs.password.value
        }

        dispatch(doLoginIfNeeded(params));  
    }

    render() {

        let errorElem;
        if (this.props.error)
            errorElem = <ErrorElem text={'ОШИБКА: Вход не выполнен! Возможно указан неверный пароль.'} />;

        return (
            <div style={{width: "350px"}}>
                <form name="enterform">
                    <label htmlFor="user_name" style={{ margin: "5px" }} >Имя:</label>
                    <input className="fieldbasic" name="user_name" id="user_name" size="10" maxLength="20" autoComplete="off" type="text" ref="username"/>
                    <label htmlFor="user_password" style={{ margin: "5px" }} >Пароль:</label>
                    <input className="fieldbasic" name="user_password" id="user_password" size="10" maxLength="20" autoComplete="off" type="password" ref="password"/>
                    <input name="action" value="do_enter" type="hidden" />
                    <input className="button" name="Submit" value="Вход" type="submit" onClick={this.onLogin} style={{marginLeft: "5px"}}/>
                </form>
                <noindex>
                    <a rel="nofollow" href="user_registration.php">Регистрация</a>
                    <span style={{ margin: "5px" }}>|</span>
                    <a rel="nofollow" href="remember_password.php">Забыли пароль?</a>
                </noindex>
                {errorElem}
            </div>
        )
    }
}

export default connect()(LoginForm);