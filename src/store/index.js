import { configureStore } from "@reduxjs/toolkit";

import findReducer from "../components/general-components/Header/findSlice";
import basketReducer from "../components/cart-components/Basket/basketSlice";

export default configureStore({
  reducer: {
    find: findReducer,
    basket: basketReducer,
  },
});
