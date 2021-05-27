//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button } from 'react-bootstrap'

import { doLoginIfNeeded } from 'src/actions/login'

import type { DefaultProps } from 'src/components'
import type { LoginState } from 'src/reducers/login'
import type { State } from 'src/reducers'

type Props = LoginState & DefaultProps;

class LoginForm extends Component<Props> {

    username: any;
    password: any;

    constructor(props) {
        super(props);
        this.username = React.createRef();  
        this.password = React.createRef();  
    }
        
    onLogin = (event) => {

        event.preventDefault();

        const { dispatch } = this.props;

        const params = {
            username: this.username.current.value,
            password: this.password.current.value
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
                        ref={this.username} 
                        size="sm" 
                        style={{marginRight: "5px", flex: "0 1 300px"}}
                    />
                    <FormControl 
                        type="password" 
                        placeholder="Пароль" 
                        maxLength="20" 
                        autoComplete="off" 
                        ref={this.password}
                        size="sm" 
                        style={{marginRight: "5px", flex: "0 1 300px"}}
                    />
                    <Button 
                        size="sm"
                        variant="light" 
                        onClick={this.onLogin}
                    >Войти</Button>
                </form>
                <p style={{margin: "0px"}}>Войти можно на сайте <a href="https://forum.mista.ru/">forum.mista.ru</a></p>
                <a rel="nofollow" href="https://forum.mista.ru/user_registration.php">Регистрация</a>
                <span style={{ margin: "5px" }}>|</span>
                <a rel="nofollow" href="https://forum.mista.ru/remember_password.php">Забыли пароль?</a>
            </div>
        )
    }
}

const mapStateToProps = (state: State): LoginState => {
    return state.login;
}

export default ( connect(mapStateToProps)(LoginForm): any );