import { createSlice } from "@reduxjs/toolkit";

const indexSlice = createSlice({
  name: "index",
  initialState: {
    time: "",
  },
  reducers: {
    SET_TIME: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { SET_TIME } = indexSlice.actions;
export default indexSlice.reducer;
