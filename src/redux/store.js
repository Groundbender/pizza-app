import { configureStore } from "@reduxjs/toolkit";
import filter from "./filterSlice";
import cart from "./cartSlice";
export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
  devTools: true,
});
