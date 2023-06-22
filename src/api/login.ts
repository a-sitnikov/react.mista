import { domain, urlLogin, urlLogout, paramsToString } from '.'

export interface ILoginRequest {
  username: string,
  password: string,
}

export const fetchLogin = async (params: ILoginRequest): Promise<void> => {
  await fetch(`${domain}/${urlLogin}`, {
    method: 'POST',
    body: paramsToString('', {user_name: params.username, user_password: params.password}),
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow'
  });
}

export const fetchLogout = async (): Promise<void> => {
  const fullUrl = `${domain}/${urlLogout}`;
  await fetch(fullUrl, {
    mode: 'no-cors',
    credentials: 'include'
  });
}