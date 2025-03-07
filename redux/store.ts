import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slicers/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
