import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "@reducer/modalSlice";
import roleGroupSlice from "@reducer/roleGroupSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    roleGroup: roleGroupSlice,
  },
});
