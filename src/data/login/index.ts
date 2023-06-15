export interface ILogin {
  userId?: number;
  userName?: string,
  userHash?: string,
  lastError?: string,
}

export interface ILoginState {
  status: "init" | "loading" | "success" | "error",
  logged: boolean,
  userId?: number,
  userName?: string,
  userHash?: string,
  lastError?: string,
  error?: string,
  lastUpdated?: number,
  isFetching?: boolean,
}

export const initialState: ILoginState = {
  status: "init",
  logged: false
}