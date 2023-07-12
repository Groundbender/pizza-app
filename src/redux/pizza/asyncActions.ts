import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem, SearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://649f5ab5245f077f3e9d836c.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`
    );

    // if (data.length === 0) {
    //   return thunkAPI.rejectWithValue("error");
    // }

    // return thunkAPI.fulfillWithValue(data);

    // 1 способ return data as CartItem[];
    return data;
  }
);
