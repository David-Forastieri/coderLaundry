import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: []
  },
  reducers: {
    getProducts: (state, action) => {
      state.products.push({ ...action.payload })
    },

    incrementQty: (state, action) => {
      const itemsPresent = state.products.find((item) => item.id === action.payload.id)
      itemsPresent.quantity++
    },

    decrementQty: (state, action) => {
      const itemsPresent = state.products.find((item) => item.id === action.payload.id)
      if (itemsPresent.quantity === 1) {
        itemsPresent.quantity = 0
        const removeItem = state.products.filter((item) => item.id !== action.payload.id)
        state.cart = removeItem;
      } else {
        itemsPresent.quantity--
      }
    }
  }
})

export const { getProducts, decrementQty, incrementQty } = ProductSlice.actions

export default ProductSlice.reducer