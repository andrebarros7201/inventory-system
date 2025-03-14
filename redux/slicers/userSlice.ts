import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@/types/User";
import UserSlice from "@/types/UserSlice";

const initialState: UserSlice = {
  user: undefined,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
});

export default userSlice.reducer;
export const UserActions = userSlice.actions;
