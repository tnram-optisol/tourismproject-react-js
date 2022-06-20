import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import { getAllHotelOrders } from "Services/api/hotelAPI";

function HotelOrders() {
  const [hotelOrders, setHotelOrders] = useState([]);
  const getAllOrders = () => {
    getAllHotelOrders()
      .then((res) => {
        setHotelOrders([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => getAllOrders(), []);
  return (
    <AdminLayout>
      <MyTable>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "10%" }}> Order Id </TableCell>
            <TableCell sx={{ width: "10%" }}> Booked On </TableCell>
            <TableCell sx={{ width: "10%" }}> Recipient </TableCell>
            <TableCell sx={{ width: "10%" }}> Recipient Email </TableCell>
            <TableCell sx={{ width: "10%" }}> Recipient Contact </TableCell>
            <TableCell sx={{ width: "7%" }}>Room Name</TableCell>
            <TableCell sx={{ width: "7%" }}>Hotel Name</TableCell>
            <TableCell sx={{ width: "7%" }}>Hotel Address</TableCell>
            <TableCell sx={{ width: "7%" }}>Tour Cost</TableCell>
            <TableCell sx={{ width: "5%" }}>Discount</TableCell>
            <TableCell sx={{ width: "5%" }}>Deductions</TableCell>
            <TableCell align="right">Paid Price</TableCell>
            <TableCell sx={{ width: "7%" }}>Order Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotelOrders.map((room, index) => (
            <TableRow>
              <TableCell>{room.order_id}</TableCell>
              <TableCell>
                {new Date(room.orderdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{room.purchased_by}</TableCell>
              <TableCell>{room.email}</TableCell>
              <TableCell>{room.user.contact}</TableCell>
              <TableCell>{room.bookRoom.room.room_name}</TableCell>
              <TableCell>{room.bookRoom.room.hotel.hotel_name}</TableCell>
              <TableCell>{room.bookRoom.room.hotel.hotel_address}</TableCell>
              <TableCell className="text-danger">
                INR {room.bookRoom.room.cost}
              </TableCell>
              <TableCell className="text-danger">{room.discount}%</TableCell>
              <TableCell className="text-danger">
                {" "}
                INR {room.bookRoom.room.cost - room.orderCost}
              </TableCell>
              <TableCell className="text-danger">
                {" "}
                INR {room.orderCost}
              </TableCell>
              <TableCell
                className={room.orderStatus ? "text-success" : "text-danger"}
              >
                {" "}
                {room.orderStatus ? "Booked" : "Canceled"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MyTable>
    </AdminLayout>
  );
}

export default HotelOrders;
