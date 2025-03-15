import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (storeID: string) => {
    try {
      const response = await axios.get(`/api/store?storeID=${storeID}`);
      return response.data.products;
    } catch (error) {
      throw new Error(`Error fetching stores: ${(error as Error).message}`);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
export const productActions = productSlice.actions;
