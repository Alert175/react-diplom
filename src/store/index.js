import { configureStore } from "@reduxjs/toolkit";

import findReducer from "../components/general-components/Header/findSlice";

export default configureStore({
  reducer: {
    find: findReducer,
  },
});
