import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slicers/userSlice";
import notificationSlice from "@/redux/slicers/notificationSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
