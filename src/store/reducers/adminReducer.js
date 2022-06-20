import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    requests: [],
    banner: [],
    category: [],
    users: [],
    orders:[],
    loading: true,
  },
};

const adminSlicer = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: {
    getAdminRequestData: (state, action) => {
      state.value.loading = true;
    },
    setAdminRequestData: (state, action) => {
      console.log(action.payload);
      state.value.requests = [...action.payload.hotel, ...action.payload.tour];
      state.value.loading = false;
    },
    getAdminCategoryData: (state, action) => {
      state.value.loading = true;
    },
    setAdminCategoryData: (state, action) => {
      state.value.category = [...action.payload];
      state.value.loading = false;
    },
    getAdminBannerData: (state, action) => {
      state.value.loading = true;
    },
    setAdminBannerData: (state, action) => {
      state.value.loading = false;
      state.value.banner = [...action.payload];
    },
    getAdminAllUserData: (state, action) => {
      state.value.loading = true;
    },
    setAdminAllUserData: (state, action) => {
      state.value.users = [...action.payload[0]];
    },
    getAdminOrdersData: (state, action) => {
      state.value.loading = true;
    },
    setAdminOrdersData: (state, action) => {
      state.value.loading = false;
      state.value.orders = [...action.payload];
    },
  },
});

export const {
  getAdminBannerData,
  getAdminRequestData,
  getAdminCategoryData,
  getAdminAllUserData,
  getAdminOrdersData,
  setAdminBannerData,
  setAdminCategoryData,
  setAdminRequestData,
  setAdminAllUserData,
  setAdminOrdersData
} = adminSlicer.actions;

export default adminSlicer.reducer;
