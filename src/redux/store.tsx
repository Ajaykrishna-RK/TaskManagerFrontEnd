import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import taskReducer from "./slice/TaskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
