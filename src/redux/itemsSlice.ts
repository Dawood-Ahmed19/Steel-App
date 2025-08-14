import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Item = {
  id: string;
  name: string;
  type: string;
  guage: number;
  size: string;
  quantity: number;
  price: number;
};

type ItemState = {
  list: Item[];
};

const initialState: ItemState = {
  list: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.list.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
