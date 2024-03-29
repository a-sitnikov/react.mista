import { FormEvent, ReactElement, useState } from "react";
import { FormControl, Button } from "react-bootstrap";

import { useAppDispatch } from "src/store";
import { doLoginIfNeeded } from "src/store";

const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (event: FormEvent) => {
    event.preventDefault();
    dispatch(doLoginIfNeeded(username, password));
  };

  return (
    <div>
      <form name="enterform" className="flex-row" style={{ flexWrap: "wrap" }}>
        <FormControl
          id="username"
          type="text"
          placeholder="Имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="sm"
          className="input"
          style={{ marginRight: "5px", flex: "0 1 300px" }}
        />
        <FormControl
          id="password"
          type="password"
          placeholder="Пароль"
          maxLength={20}
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="sm"
          className="input"
          style={{ marginRight: "5px", flex: "0 1 300px" }}
        />
        <Button size="sm" variant="light" className="button" onClick={onLogin}>
          Войти
        </Button>
      </form>
      <p style={{ margin: "0px" }}>
        Войти можно на сайте{" "}
        <a href="https://forum.mista.ru/">forum.mista.ru</a>
      </p>
      <a rel="nofollow" href="https://forum.mista.ru/user_registration.php">
        Регистрация
      </a>
      <span style={{ margin: "5px" }}>|</span>
      <a rel="nofollow" href="https://forum.mista.ru/remember_password.php">
        Забыли пароль?
      </a>
    </div>
  );
};

export default LoginForm;
