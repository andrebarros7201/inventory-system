import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreSlice from "@/types/StoreSlice";

const initialState: StoreSlice = {
  stores: [],
  loading: false,
  error: null,
};

export const fetchStores = createAsyncThunk(
  "store/fetchStores",
  async (userID: string) => {
    const response = await fetch(`api/store?userID=${userID}`);
    if (!response.ok) {
      throw new Error("Failed to fetch stores.");
    }
    return response.json();
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.loading = false;
      })
      .addCase(fetchStores.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch stores.";
      });
  },
});

export default storeSlice.reducer;
export const StoreActions = storeSlice.actions;
