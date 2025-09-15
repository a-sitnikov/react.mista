import { paramsToString } from "./api-utils";
import { domainApi, urlLogin, urlLogout } from ".";

export interface ILoginRequest {
  username: string;
  password: string;
}

export const fetchLogin = async (params: ILoginRequest): Promise<void> => {
  await fetch(`${domainApi}/${urlLogin}`, {
    method: "POST",
    body: paramsToString("", {
      user_name: params.username,
      user_password: params.password,
    }),
    mode: "no-cors",
    credentials: "include",
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow",
  });
};

export const fetchLogout = async (): Promise<void> => {
  const fullUrl = `${domainApi}/${urlLogout}`;
  await fetch(fullUrl, {
    mode: "no-cors",
    credentials: "include",
  });
};
