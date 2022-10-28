import { configureStore } from "@reduxjs/toolkit";
import indexSlice from "@reducer/indexSlice";

export const store = configureStore({
  reducer: {
    index: indexSlice,
  },
});
