import { type FormEvent, useState } from "react";
import { FormControl, Button } from "react-bootstrap";

import { useAppDispatch, doLoginIfNeeded } from "src/store";
import Separator from "../common/separator";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (event: FormEvent) => {
    event.preventDefault();
    dispatch(doLoginIfNeeded(username, password));
  };

  return (
    <div className="flex">
      <div className="text-link cursor-pointer">Вход</div>
      <Separator />
      <a
        rel="nofollow"
        href="https://forum.mista.ru/user/registration"
        target="_blank"
      >
        Регистрация
      </a>
    </div>
  );

  return (
    <div className="grow-1 shrink-1">
      <form name="enterform" className="flex flex-wrap gap-1">
        <FormControl
          id="username"
          type="text"
          placeholder="Имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="sm"
          className="input shrink-1 basis-75"
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
          className="input shrink-1 basis-75"
        />
        <Button size="sm" variant="light" className="button" onClick={onLogin}>
          Войти
        </Button>
      </form>
      <a rel="nofollow" href="https://forum.mista.ru/user/registration">
        Регистрация
      </a>
    </div>
  );
};

export default LoginForm;
