//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, ButtonGroup } from 'react-bootstrap'

import { doLoginIfNeeded } from 'src/actions/login'

import type { DefaultProps } from 'src/components'
import type { LoginState } from 'src/reducers/login'
import type { State } from 'src/reducers'

type Props = LoginState & DefaultProps;

class LoginForm extends Component<Props> {

    username: any;
    password: any;

    onLogin = (event) => {

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
                        size="sm" 
                        style={{marginRight: "5px", flex: "0 1 300px", marginBottom: "5px"}}
                    />
                    <FormControl 
                        type="password" 
                        placeholder="Пароль" 
                        maxLength="20" 
                        autoComplete="off" 
                        inputRef={ref => {this.password = ref}}
                        size="sm" 
                        style={{marginRight: "5px", flex: "0 1 300px", marginBottom: "5px"}}
                    />
                    {/*<ButtonGroup>*/}
                        <Button size="sm" onClick={this.onLogin}>Войти</Button>
                    {/*</ButtonGroup>*/}
                </form>
                <p style={{margin: "0px"}}>Войти можно на сайте <a href="https://www.forum.mista.ru/">forum.mista.ru</a></p>
                <a rel="nofollow" href="https://www.forum.mista.ru/user_registration.php">Регистрация</a>
                <span style={{ margin: "5px" }}>|</span>
                <a rel="nofollow" href="https://www.forum.mista.ru/remember_password.php">Забыли пароль?</a>
            </div>
        )
    }
}

const mapStateToProps = (state: State): LoginState => {
    return state.login;
}

export default connect(mapStateToProps)(LoginForm);