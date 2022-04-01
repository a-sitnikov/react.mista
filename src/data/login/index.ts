export interface ILogin {
  userId?: number;
  userName?: string,
  userHash?: string,
  lastError?: string,
}

export interface ILoginState {
  logged?: boolean,
  userId?: number,
  userName?: string,
  userHash?: string,
  lastError?: string,
  error?: string,
  lastUpdated?: number,
  isFetching: boolean,
}

export const initialState: ILoginState = {
  isFetching: false
}
