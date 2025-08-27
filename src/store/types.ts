import { type store } from "./root";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
