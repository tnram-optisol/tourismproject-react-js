import axiosIntercept from "Services/axios";
import {
  HOTEL_ADMIN_ADD_HOTEL,
  HOTEL_ADMIN_ADD_ROOM,
  HOTEL_ADMIN_ALL_ORDERS,
  HOTEL_ADMIN_GET_HOTEL,
  HOTEL_ADMIN_GET_ROOM,
} from "Services/services.constants";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function addHotel(values) {
  return axiosIntercept.post(`${SERVER_URL}${HOTEL_ADMIN_ADD_HOTEL}`,values);
}

export function addRoom(values) {
  return axiosIntercept.post(`${SERVER_URL}${HOTEL_ADMIN_ADD_ROOM}`, values);
}

export function getAllRooms(hotel_id) {
  return axiosIntercept.get(`${SERVER_URL}${HOTEL_ADMIN_GET_ROOM}/${hotel_id}`);
}

export function getAllHotels() {
  return axiosIntercept.get(`${SERVER_URL}${HOTEL_ADMIN_GET_HOTEL}`);
}

export function getAllHotelOrders() {
  return axiosIntercept.get(`${SERVER_URL}${HOTEL_ADMIN_ALL_ORDERS}`);
}
