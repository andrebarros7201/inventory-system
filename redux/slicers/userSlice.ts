import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action) {
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
