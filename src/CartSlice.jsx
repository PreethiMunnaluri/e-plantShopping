import { createSlice } from '@reduxjs/toolkit';

// Cart items are stored as:
// { name: string, image: string, price: number, quantity: number }
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, price } = action.payload;
      const existing = state.items.find((i) => i.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ name, image, price, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const name = action.payload; // payload is item name
      state.items = state.items.filter((i) => i.name !== name);
    },
    incrementQuantity: (state, action) => {
      const name = action.payload; // payload is item name
      const item = state.items.find((i) => i.name === name);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const name = action.payload; // payload is item name
      const item = state.items.find((i) => i.name === name);
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
      }
    },
    // Optional helper for debugging/QA
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
