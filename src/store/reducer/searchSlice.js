import { createSlice } from "@reduxjs/toolkit";

const name = "search";

const initialState = { menuCode: "" };

export const searchSelector = (state) => state.search;

const searchSlice = createSlice({
  name,
  initialState,

  reducers: {
    setSearchResult: (state, action) => {
      state.payload = action.payload;
    },
  } });

export const { setSearchResult } = searchSlice.actions;

export default searchSlice.reducer;
