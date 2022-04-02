
export type INewMessageState = {
  isFetching: boolean;
  text: string
};

export const initialState: INewMessageState = {
  isFetching: false,
  text: ''
}