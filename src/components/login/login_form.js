//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, ButtonGroup } from 'react-bootstrap'


import ErrorElem from '../common/error'
import { doLoginIfNeeded } from 'src/actions/login'

import type { DefaultProps } from 'src/components'

type LoggedUserProps = {
    error: string
}

type Props = LoggedUserProps & DefaultProps;

class LoginForm extends Component<Props> {

    onLogin;
    username: any;
    password: any;

    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(event) {

        event.preventDefault();

        const { dispatch } = this.props;

        const params = {
            username: this.username.value,
            password: this.password.value
        }

        dispatch(doLoginIfNeeded(params));  
    }

    render() {

        return (
            <div>
                <form name="enterform" className="flex-row" style={{flexWrap: "wrap"}}>
                    <FormControl 
                        type="text" 
                        placeholder="Имя" 
                        inputRef={ref => {this.username = ref}} 
                        bsSize="sm" 
                        style={{marginRight: "5px", flex: "0 1 300px", marginBottom: "5px"}}
                    />
                    <FormControl 
                        type="password" 
                        placeholder="Пароль" 
                        maxLength="20" 
                        autoComplete="off" 
                        inputRef={ref => {this.password = ref}}
                        bsSize="sm" 
                        style={{marginRight: "5px", flex: "0 1 300px", marginBottom: "5px"}}
                    />
                    <ButtonGroup>
                        <Button bsSize="sm" onClick={this.onLogin}>Войти</Button>
                    </ButtonGroup>
                </form>
                <p style={{margin: "0px"}}>Войти можно на сайте <a href="https://www.forum.mista.ru/">forum.mista.ru</a></p>
                <a rel="nofollow" href="https://www.forum.mista.ru/user_registration.php">Регистрация</a>
                <span style={{ margin: "5px" }}>|</span>
                <a rel="nofollow" href="https://www.forum.mista.ru/remember_password.php">Забыли пароль?</a>
                {this.props.error && <ErrorElem text={'ОШИБКА: Вход не выполнен! Возможно указан неверный пароль.'} />}
            </div>
        )
    }
}

export default connect()(LoginForm);