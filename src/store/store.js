import { configureStore } from "@reduxjs/toolkit";
import indexSlice from "@reducer/indexSlice";
import roleGroupSlice from "@reducer/roleGroupSlice";

export const store = configureStore({
  reducer: {
    index: indexSlice,
    roleGroup: roleGroupSlice,
  },
});
