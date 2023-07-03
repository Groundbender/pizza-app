import { configureStore } from "@reduxjs/toolkit";
import filter from "./filterSlice";
import cart from "./cartSlice";
import pizza from "./pizzaSlice";
export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
  devTools: true,
});
