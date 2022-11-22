import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "@reducer/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
});
