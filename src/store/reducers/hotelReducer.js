import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    hotel: [],
    room: [],
    viewRoom: [],
    loading: true,
  },
};

const hotelSlicer = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: {
    getUserHotelData: (state, action) => {},
    setUserHotelData: (state, action) => {
      state.value.hotel = [...action.payload];
    },
    getUserRoomData: (state, action) => {},
    setUserRoomlData: (state, action) => {
      state.value.room = [...action.payload];
    },
    viewSingleRoomData: (state, action) => {
      state.value.loading = true;
    },
    setSingleRoomData: (state, action) => {
      state.value.loading = false;
      state.value.viewRoom = [action.payload];
    },
    getAdminHotelData: (state, action) => {
      state.value.loading = true;
    },
    setAdminHotelData: (state, action) => {
      state.value.loading = false;
      state.value.hotel = [...action.payload];
    },
    getAdminRoomData: (state, action) => {},
    setAdminRoomlData: (state, action) => {
      state.value.loading = false;
      state.value.room = [...action.payload];
    },
  },
});

export const {
  getUserHotelData,
  setUserHotelData,
  getUserRoomData,
  setUserRoomlData,
  getAdminHotelData,
  setAdminHotelData,
  getAdminRoomData,
  setAdminRoomlData,
  viewSingleRoomData,
  setSingleRoomData,
} = hotelSlicer.actions;
export default hotelSlicer.reducer;
