import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    tour: [],
    adminTour: [],
    viewTour: [],
    tourOrders:[],
    loading: true,
  },
};

const tourSlicer = createSlice({
  name: "tour",
  initialState: initialState,
  reducers: {
    getUserTourData: (state, action) => {},
    setUserTourData: (state, action) => {
      state.value.tour = [...action.payload];
    },
    viewSingleTourData: (state, action) => {},
    setSingleTourData: (state, action) => {
      state.value.loading = false;
      state.value.viewTour = [action.payload];
    },
    getAdminTourData: (state, action) => {},
    setAdminTourData: (state, action) => {
      state.value.loading = false;
      state.value.adminTour = [...action.payload];
    },
    getAdminTourOrders: (state, action) => {},
    setAdminTourOrders: (state, action) => {
      state.value.loading = false;
      state.value.tourOrders = [...action.payload];
    },
  },
});

export const {
  getUserTourData,
  setUserTourData,
  setAdminTourData,
  getAdminTourData,
  viewSingleTourData,
  setSingleTourData,
  getAdminTourOrders,
  setAdminTourOrders
} = tourSlicer.actions;
export default tourSlicer.reducer;
