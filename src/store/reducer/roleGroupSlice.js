import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "@utils/axiosUtil";


export const GET_COMPANY = createAsyncThunk("GET_COMPANY", async () => {
  const res = await request.get("/login/company");
  return res.data;
});

export const GET_ROLE_GROUP = createAsyncThunk("GET_ROLE_GROUP", async () => {
  const res = await request.get("/role-group");
  return res.data;
});

const initialState = {
  companyName: "",
  roleGroupList: [],
  isLoading: true,
  refresh: false,
};

const roleGroupSlice = createSlice({
  name: "roleGroup",
  initialState,
  reducers: {
    changeRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
  extraReducers: {
    [GET_COMPANY.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.companyName = payload.companyName;
    },
    [GET_COMPANY.pending]: (state) => {
      state.isLoading = true;
    },
    [GET_ROLE_GROUP.fulfilled]: (state, { payload }) => {
      state.roleGroupList = payload;
      state.isLoading = false;
    },
    [GET_ROLE_GROUP.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
  },
});

export const { changeRefresh } = roleGroupSlice.actions;
export default roleGroupSlice.reducer;
