import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import StoreSlice from "@/types/StoreSlice";

const initialState: StoreSlice = {
  userStores: [],
  loading: false,
  error: null,
  chosenStore: null,
};

export const fetchStores = createAsyncThunk(
  "store/fetchStores",
  async (userID: string) => {
    try {
      const response = await fetch(`/api/store?userID=${userID}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch stores. Status: ${response.status}`);
      }
      const data = await response.json();
      return data.stores;
    } catch (error) {
      throw new Error(`Error fetching stores: ${(error as Error).message}`);
    }
  },
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.userStores = action.payload;
    },
    clearStores: (state) => {
      state.userStores = [];
    },
    setChosenStore: (state, action: PayloadAction<string>) => {
      state.chosenStore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.userStores = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchStores.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch stores.";
      });
  },
});

export default storeSlice.reducer;
export const StoreActions = storeSlice.actions;
