import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slicers/userSlice";
import notificationSlice from "@/redux/slicers/notificationSlice";
import storeSlice from "@/redux/slicers/storeSlice";
import productSlice from "@/redux/slicers/productSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    store: storeSlice,
    product: productSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
