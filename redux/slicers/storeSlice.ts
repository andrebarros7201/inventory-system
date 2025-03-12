import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.stores = action.payload;
    },
  },
});

export default storeSlice.reducer;
export const storeActions = storeSlice.actions;
