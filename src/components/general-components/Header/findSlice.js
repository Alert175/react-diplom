import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const slice = createSlice({
  name: "find",
  initialState,
  reducers: {
    changeFind: (state, action) => {
      state.value = action.payload;
    },
  },
});

// export redusers
export const { changeFind } = slice.actions;

// export selectors
export const selectFind = (state) => state.find.value;

export default slice.reducer;
