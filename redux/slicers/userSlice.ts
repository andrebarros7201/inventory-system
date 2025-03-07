import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state) {
      state.isLoggedIn = true;
    },
  },
});

export default userSlice.reducer;
export const UserActions = userSlice.actions;
