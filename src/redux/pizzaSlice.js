import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://649f5ab5245f077f3e9d836c.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("error");
    }
    console.log(data.length);

    return thunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  items: [],
  status: "loading", // loading success error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = action.payload || "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
