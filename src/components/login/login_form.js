import React, { Component } from 'react'

import { doLoginIfNeeded } from '../../actions/login'

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(event) {

        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(doLoginIfNeeded());  

    }

    render() {

        return (
            <td id="user-td">
                <form name="enterform">
                    <label htmlFor="user_name" style={{ margin: "5px" }} >Имя:</label>
                    <input className="fieldbasic" name="user_name" id="user_name" size="10px" maxLength="20px" autoComplete="off" type="text" />
                    <label htmlFor="user_password" style={{ margin: "5px" }} >Пароль:</label>
                    <input className="fieldbasic" name="user_password" id="user_password" size="10px" maxLength="20px" autoComplete="off" type="password" />
                    <input name="action" value="do_enter" type="hidden" />
                    <input className="sendbutton" style={{ margin: "5px" }} name="Submit" value="Вход" type="submit" onClick={this.onLogin} />
                </form>
                <noindex>
                    <a rel="nofollow" href="user_registration.php">Регистрация</a>
                    <span style={{ margin: "5px" }}>|</span>
                    <a rel="nofollow" href="remember_password.php">Забыли пароль?</a>
                </noindex>
            </td>
        )
    }
}

export default LoginForm;