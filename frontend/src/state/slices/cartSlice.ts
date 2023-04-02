import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { CartState, UpdateCartProps, WoocommerceCartItem, WooCommerceProduct, WooCommerceProductList } from '@/types';


const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  klarnaOrderId: "",
  klarnaHtmlSnippet: "",
  wooOrderId: -1,
};

const persistConfig = {
    key: 'global',
    storage,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<WoocommerceCartItem>) => {

      const itemToAdd = action.payload;
      const existingItem: WoocommerceCartItem = state.items.find(
          (item: WoocommerceCartItem) => item.id === itemToAdd.id)!;
      if (existingItem) {
          existingItem.quantity += itemToAdd.quantity;
          state.totalQuantity += itemToAdd.quantity;
          state.totalAmount += itemToAdd.price * itemToAdd.quantity;
      } else {
          state.items.push(itemToAdd);
          state.totalQuantity += itemToAdd.quantity;
          state.totalAmount += itemToAdd.price * itemToAdd.quantity;
      }
    },
    updateItemQuantity: (state, action: PayloadAction<UpdateCartProps>) => {
      const { id, quantity }: UpdateCartProps = action.payload;

      const itemToUpdate: WoocommerceCartItem = state.items.find(item => item.id === id)!;

      if (itemToUpdate) {
          const oldQuantity:number = itemToUpdate.quantity;
          const oldAmount:number = itemToUpdate.price * oldQuantity;

          itemToUpdate.quantity = quantity;
          const addAmount: number = itemToUpdate.price * quantity;

          state.totalQuantity += quantity - oldQuantity;
          state.totalAmount += addAmount - oldAmount;
      }
  },clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.klarnaOrderId = "";
      state.klarnaHtmlSnippet = "";
  },
  setKlarnaHtmlSnippet: (state, action: PayloadAction<string>) => {
    state.klarnaHtmlSnippet = action.payload;
  },
  setKlarnaOrderId: (state, action: PayloadAction<string>) => {
    state.klarnaOrderId = action.payload;
  },
  setWooCommerceOrderId: (state, action: PayloadAction<number>) => {
    state.wooOrderId = action.payload;
  }

  },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateItemQuantity, clearCart, setKlarnaHtmlSnippet, setKlarnaOrderId, setWooCommerceOrderId} = cartSlice.actions

export default cartSlice.reducer