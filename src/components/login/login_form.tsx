import React, { FC, ReactElement, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { FormControl, Button } from 'react-bootstrap'

import { doLoginIfNeeded } from 'src/data/login/actions'
import { RootState, useAppDispatch } from 'src/data/store'

const mapState = (state: RootState) => {
  return state.login;
}

const connector = connect(mapState);
const LoginForm: FC<ConnectedProps<typeof connector>> = (props): ReactElement => {

  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(doLoginIfNeeded(username, password));
  }

  return (
    <div>
      <form name="enterform" className="flex-row" style={{ flexWrap: "wrap" }}>
        <FormControl
          type="text"
          placeholder="Имя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          size="sm"
          style={{ marginRight: "5px", flex: "0 1 300px" }}
        />
        <FormControl
          type="password"
          placeholder="Пароль"
          maxLength={20}
          autoComplete="off"
          value={password}
          onChange={e => setPassword(e.target.value)}
          size="sm"
          style={{ marginRight: "5px", flex: "0 1 300px" }}
        />
        <Button
          size="sm"
          variant="light"
          onClick={onLogin}
        >Войти</Button>
      </form>
      <p style={{ margin: "0px" }}>Войти можно на сайте <a href="https://forum.mista.ru/">forum.mista.ru</a></p>
      <a rel="nofollow" href="https://forum.mista.ru/user_registration.php">Регистрация</a>
      <span style={{ margin: "5px" }}>|</span>
      <a rel="nofollow" href="https://forum.mista.ru/remember_password.php">Забыли пароль?</a>
    </div>
  )

}

export default connector(LoginForm);