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
    clearStores: (state) => {
      state.stores = [];
    },
  },
});

export default storeSlice.reducer;
export const StoreActions = storeSlice.actions;
