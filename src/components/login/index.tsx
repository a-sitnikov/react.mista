import { ReactElement, useEffect } from "react";
import LoggedUser from "./logged_user";
import LoginForm from "./login_form";
import ErrorElem from "../common/error";

import { useAppDispatch, useAppSelector } from "src/store";
import { checkLoginIfNeeded } from "src/store";

const Login = (): ReactElement => {
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.login.logged);
  const userId = useAppSelector((state) => state.login.userId);
  const userName = useAppSelector((state) => state.login.userName);
  const error = useAppSelector((state) => state.login.error);

  useEffect(() => {
    dispatch(checkLoginIfNeeded());
  }, [dispatch]);

  let elem: ReactElement;
  if (logged === true)
    elem = <LoggedUser userId={userId} userName={userName} />;
  else if (logged === false) elem = <LoginForm />;
  else elem = null;

  return (
    <>
      {elem}
      {error && <ErrorElem text={error} />}
    </>
  );
};

export default Login;
