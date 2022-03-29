import { domain, urlLogin, urlLogout, urlCookies, fetchJsonpAndGetJson, paramsToString } from '.'

// Cookies
export type ResponseCookies = {
  cookie: {
    entr_id: string,
    entr_key: string,
    entr_hash: string
  },
  session: {
    user_id: string,
    user_name: string,
    user_hash: string,
    is_moderator: number,
    light_moderator: number,
    section: string,
    show_moderator_tools: number,
    last_error?: string
  }
}

export const getCookies = async (): Promise<ResponseCookies> => {
  const json = await fetchJsonpAndGetJson(urlCookies);
  return json;
}

// Login
export type RequestLogin = {
  username: string, // логин (ник) пользователя
  password: string, // пароль пользователя
  callback?: string, // если указано, то ответ заворачивается в вызов функции, имя которой передано в параметре (реализация JSONP)
}

export type ResponseLogin = {
  userid: string,
  username: string,
  hashkey: string,
  error?: string
}

export const getLogin = async (params: RequestLogin): Promise<any> => {
  let result = await fetch(`${domain}/${urlLogin}`, {
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

export const getLogout = async (): Promise<any> => {
  const fullUrl = `${domain}/${urlLogout}`;
  await fetch(fullUrl, {
    mode: 'no-cors',
    credentials: 'include'
  });
}