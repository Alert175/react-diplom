import { createSlice } from "@reduxjs/toolkit";
import {setItem, deleteItem, getItem} from "../../../services/localStorage.services";

// get products in localStorage
const handlerReadStorage = () => {
  try {
    return {
      value: getItem('products') || []
    }
  } catch (e) {
    return {
      value: [],
    }
  }
}

export const slice = createSlice({
  name: "basket",
  initialState: handlerReadStorage(),
  reducers: {
    addedProduct: (state, action) => {
      if (
        state.value.find(
          (element) =>
            element.id === action.payload.id &&
            element.size === action.payload.size
        )
      ) {
        let result = [];
        for (const item of state.value) {
          if (
            item.id === action.payload.id &&
            item.size === action.payload.size
          ) {
            const updateItem = {
              ...item,
              count: (item.count += action.payload.count),
            };
            result = [...result, updateItem];
          } else {
            result = [...result, item];
          }
        }
        state.value = [...result];
        setItem("products", [...result]);
        return;
      }
      setItem("products", [...state.value, action.payload]);
      state.value = [...state.value, action.payload];
    },
    deleteProduct: (state, action) => {
      state.value = [
        ...state.value.filter((element) => element.id !== action.payload),
      ];
      setItem("products", [
        ...state.value.filter((element) => element.id !== action.payload),
      ]);
    },
    clearProduts: (state) => {
      state.value = [];
      deleteItem("products");
    },
  },
});

// export redusers
export const { addedProduct, deleteProduct, clearProduts } = slice.actions;

// export selectors
export const selectProducts = (state) => state.basket.value;

export default slice.reducer;
