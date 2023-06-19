import React, { FC, ReactElement, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import LoggedUser from './logged_user'
import LoginForm from './login_form'
import ErrorElem from '../common/error'

import { checkLoginIfNeeded } from 'src/store/login'
import { RootState, useAppDispatch } from 'src/store/store'

const mapState = (state: RootState) => {
  return state.login;
}

const connector = connect(mapState);
const Login: FC<ConnectedProps<typeof connector>> = ({ logged, userId, userName, error }): ReactElement => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkLoginIfNeeded());
  }, [dispatch]);

  let elem: ReactElement;
  if (logged === true)
    elem = <LoggedUser userId={userId} userName={userName} />
  else if (logged === false)
    elem = <LoginForm />
  else
    elem = null;

  return (
    <>
      {elem}
      {error && <ErrorElem text={error} />}
    </>
  )
}

export default connector(Login);