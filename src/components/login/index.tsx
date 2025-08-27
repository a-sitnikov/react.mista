import { useEffect } from "react";
import { useAppDispatch, useAppSelector , checkLoginIfNeeded } from "src/store";
import ErrorElem from "../common/error";
import LoggedUser from "./logged_user";
import LoginForm from "./login_form";



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
