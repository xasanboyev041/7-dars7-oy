import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        state.items.push(product);
      }

      state.totalQuantity += product.quantity;
      calculateTotals(state);
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== productId);
        state.totalQuantity -= existingItem.quantity;
      }

      calculateTotals(state);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        existingItem.quantity = quantity;
      }

      calculateTotals(state);
    },
  },
});

function calculateTotals(state) {
  state.subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  state.tax = state.subtotal * 0.12;
  state.total = state.subtotal + state.tax;
}

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
