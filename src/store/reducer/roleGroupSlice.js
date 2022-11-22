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

export const GET_GNB_LIST = createAsyncThunk("GET_GNB_LIST", async () => {
  const { data } = await request.get("/menu/gnb");
  return data;
});

export const GET_LNB_LIST = createAsyncThunk("GET_LNB_LIST", async ({ roleGroupNo, moduleCode }) => {
  const { data } = await request.get(`/menu-role?roleGroupNo=${roleGroupNo}&moduleCode=${moduleCode}`);
  return data;
});

const initialState = {
  companyName: "",
  roleGroupList: [],
  GNBList: [],
  LNBList: [],
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
    [GET_ROLE_GROUP.pending]: (state) => {
      state.isLoading = true;
    },
    [GET_GNB_LIST.fulfilled]: (state, { payload }) => {
      state.GNBList = payload;
      state.isLoading = false;
    },
    [GET_GNB_LIST.pending]: (state) => {
      state.isLoading = true;
    },
    [GET_LNB_LIST.fulfilled]: (state, { payload }) => {
      state.LNBList = payload;
      state.isLoading = false;
    },
    [GET_LNB_LIST.pending]: (state) => {
      state.isLoading = true;
    },
    [GET_LNB_LIST.rejected]: (state) => {

    },
  },
});

export const { changeRefresh } = roleGroupSlice.actions;
export default roleGroupSlice.reducer;
