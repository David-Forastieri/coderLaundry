import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProductsReducer from "./ProductsReducer";

export default configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductsReducer
  },
})