import { useEffect } from "react";
import LoggedUser from "./logged_user";
import LoginForm from "./login_form";
import ErrorElem from "../common/error";

import { useAppDispatch, useAppSelector } from "src/store";
import { checkLoginIfNeeded } from "src/store";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.login.logged);
  const userId = useAppSelector((state) => state.login.userId);
  const userName = useAppSelector((state) => state.login.userName);
  const error = useAppSelector((state) => state.login.error);

  useEffect(() => {
    dispatch(checkLoginIfNeeded());
  }, [dispatch]);

  return (
    <>
      {logged ? (
        <LoggedUser userId={userId} userName={userName} />
      ) : (
        <LoginForm />
      )}
      {error && <ErrorElem text={error} />}
    </>
  );
};

export default Login;
