import { createSlice } from "@reduxjs/toolkit";

const name = "application";

const initialState = [];
export const applicationSelector = (state) => state.application;

const applicationSlice = createSlice({
  name,
  initialState,
  reducers: {
    SET_TIME: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { SET_TIME } = applicationSlice.actions;

export default applicationSlice.reducer;
