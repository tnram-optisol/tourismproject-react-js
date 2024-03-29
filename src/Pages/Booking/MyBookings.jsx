import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import MyCarousel from "Layout/Carousel";
import {
  getOrders,
  getCanceledOrders,
  refundOrders,
} from "Services/api/ordersAPI";
import {
  getActiveBookings,
  cancelBookings,
  cancelRoomBookings,
} from "Services/api/bookingAPI";
import MyTable from "Component/Table/MyTable";
import UserLayout from "Component/Wrapper/UserLayout";

function MyBookings(props) {
  const token = localStorage.getItem("token");
  const user = token !== "" ? JSON.parse(atob(token.split(".")[1])) : {};
  const [tour, setTour] = useState([]);
  const [room, setRoom] = useState([]);
  const [orderCanceled, setOrderCanceled] = useState([]);
  const [cancelMsg, setCancelMsg] = useState("");
  const navigate = useNavigate();
  let discount = 0;
  let totalCost = 0;

  const getBookings = () => {
    if (user.id > 0) {
      getActiveBookings(user.id)
        .then((res) => {
          setTour([...res.data.tourBooking]);
          setRoom([...res.data.roomBooking]);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCanceledOrders()
      .then((res) => {
        setOrderCanceled([...res.data]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => getBookings, []);

  const handleCancel = (data, name) => {
    let userConfirm = window.confirm(`Is it ok to cancel booking for ${name}`);
    console.log(data);
    if (userConfirm) {
      if (data.room) {
        cancelRoomBookings(data.id);
      }
    }
  };

  const calculateCost = (totalPerson, tourCost, totalDays) => {
    let discountPrice = 0;
    if (totalPerson > 3) {
      discount = 40;
      discountPrice = tourCost - parseInt(tourCost / 100) * discount;
      totalCost = discountPrice * totalPerson;
      return totalCost;
    } else {
      discount = 20;
      discountPrice = tourCost - parseInt(tourCost / 100) * discount;
      totalCost = discountPrice * totalPerson;
      return totalCost;
    }
  };

  const handlePayNow = (row) => {
    navigate("/payment", {
      replace: true,
      state: {
        data: row,
        totalCost: totalCost,
        discount: discount,
      },
    });
  };

  const viewOrder = (id) => {
    getOrders(id)
      .then((res) => {
        navigate("/my/orders", { state: res.data, replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelOrder = (row) => {
    let userConfirm = window.confirm(
      `Is it ok to cancel order for ${row.tour.package_name}`
    );
    console.log(row);
    if (userConfirm) {
      refundOrders({
        bookId: row.book_id,
      })
        .then((res) => {
          getBookings();
          toast("Refund Initiated");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <UserLayout>
        <ToastContainer />
        <Box>
          {cancelMsg ? <Alert severity="error">{cancelMsg}</Alert> : ""}
          <MyCarousel />
          <Typography variant="h6" color="blueviolet">
            Active Orders
          </Typography>
          {tour.length > 0 ? (
            <Box>
              <Typography variant="h6" color="blueviolet">
                Tour Orders
              </Typography>
              <MyTable>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "5%" }}> Package Name </TableCell>
                    <TableCell sx={{ width: "5%" }}> Booked On </TableCell>
                    <TableCell sx={{ width: "1%" }}> Total Days </TableCell>
                    <TableCell sx={{ width: "1%" }}> Total Person </TableCell>
                    <TableCell sx={{ width: "1%" }}> Discount </TableCell>
                    <TableCell sx={{ width: "5%" }}> Cost </TableCell>
                    <TableCell sx={{ width: "4%" }}>
                      {" "}
                      Price After Discount{" "}
                    </TableCell>
                    <TableCell sx={{ width: "5%" }}> Payment Status </TableCell>
                    <TableCell
                      sx={{ width: "10%", textAlign: "center" }}
                      colSpan="3"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tour.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.tour.package_name}
                      </TableCell>
                      <TableCell>{row.book_date}</TableCell>
                      <TableCell>{row.tour.total_days}</TableCell>
                      <TableCell>{row.max_person}</TableCell>
                      <TableCell>
                        {" "}
                        {row.max_person > 3 ? "40 % " : "20%"}{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        ₹​ {row.max_person * row.tour.cost}{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        ₹​{" "}
                        {calculateCost(
                          row.max_person,
                          row.tour.cost,
                          row.tour.total_days
                        )}{" "}
                      </TableCell>
                      <TableCell
                        className={row.payment ? "text-success" : "text-danger"}
                      >
                        {row.payment ? "Successfully Booked" : "Pending"}
                      </TableCell>
                      {!row.payment ? (
                        <TableCell>
                          <Tooltip
                            title={
                              <>
                                <h6>Use Promotion code VIPTOUR at checkout</h6>
                              </>
                            }
                          >
                            <Button
                              variant="outlined"
                              color="success"
                              className="btn m-2"
                              onClick={() => handlePayNow(row)}
                            >
                              {" "}
                              Pay Now{" "}
                            </Button>
                          </Tooltip>
                          <Button
                            variant="outlined"
                            color="error"
                            className="btn m-2"
                            onClick={() =>
                              handleCancel(row, row.tour.package_name)
                            }
                          >
                            {" "}
                            Cancel{" "}
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            className="btn m-2"
                            onClick={() => viewOrder(row.book_id)}
                          >
                            {" "}
                            View Order{" "}
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            className="btn m-2"
                            onClick={() => cancelOrder(row)}
                          >
                            {" "}
                            Cancel Order{" "}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </MyTable>
            </Box>
          ) : orderCanceled.length > 0 ? (
            <h6 className="text-danger">Order Canceled</h6>
          ) : (
            <h6 className="text-danger">Book A Package to View</h6>
          )}
          {room.length > 0 ? (
            <Box>
              <Typography variant="h6" color="blueviolet">
                Hotel Orders
              </Typography>
              <MyTable>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "5%" }}> Hotel Name </TableCell>
                    <TableCell sx={{ width: "5%" }}> Room Name </TableCell>
                    <TableCell sx={{ width: "5%" }}> Check In Date </TableCell>
                    <TableCell sx={{ width: "5%" }}> Check Out Date </TableCell>
                    <TableCell sx={{ width: "1%" }}> Total Days </TableCell>
                    <TableCell sx={{ width: "1%" }}> Total Person </TableCell>
                    <TableCell sx={{ width: "5%" }}> Cost </TableCell>
                    <TableCell sx={{ width: "5%" }}> Payment Status </TableCell>
                    <TableCell
                      sx={{ width: "10%", textAlign: "center" }}
                      colSpan="3"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {room.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.room.hotel.hotel_name}
                      </TableCell>
                      <TableCell>{row.room.room_name}</TableCell>
                      <TableCell>{row.in_Date}</TableCell>
                      <TableCell>{row.out_Date}</TableCell>
                      <TableCell>{row.total_Days}</TableCell>
                      <TableCell>{row.total_person}</TableCell>
                      <TableCell>
                        {" "}
                        ₹​{" "}
                        {row.total_person *
                          row.room.room_price *
                          row.total_Days}{" "}
                      </TableCell>
                      <TableCell
                        className={row.payment ? "text-success" : "text-danger"}
                      >
                        {row.payment ? "Successfully Booked" : "Pending"}
                      </TableCell>
                      {!row.payment ? (
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="success"
                            className="btn m-2"
                            onClick={() => handlePayNow(row)}
                          >
                            {" "}
                            Pay Now{" "}
                          </Button>{" "}
                          <Button
                            variant="outlined"
                            color="error"
                            className="btn m-2"
                            onClick={() =>
                              handleCancel(row, row.room.room_name)
                            }
                          >
                            {" "}
                            Cancel{" "}
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            className="btn m-2"
                            onClick={() => viewOrder(row.id)}
                          >
                            {" "}
                            View Order{" "}
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            className="btn m-2"
                            onClick={() => cancelOrder(row)}
                          >
                            {" "}
                            Cancel Order{" "}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </MyTable>
            </Box>
          ) : (
            <h6 className="text-danger">Book A Room to View</h6>
          )}
          <Typography variant="h6" color="blueviolet">
            Canceled Orders
          </Typography>
          {orderCanceled.length > 0 ? (
            <MyTable>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%" }}> Order Id </TableCell>
                  <TableCell sx={{ width: "5%" }}> Package Name </TableCell>
                  <TableCell sx={{ width: "5%" }}> Booked On </TableCell>
                  <TableCell sx={{ width: "1%" }}> Total Person </TableCell>
                  <TableCell sx={{ width: "5%" }}> Order Cost </TableCell>
                  <TableCell sx={{ width: "5%" }}> Status </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderCanceled.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.order_id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.bookTour.tour.package_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(row.orderdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.bookTour.max_person}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.orderCost}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className={
                        row.orderStatus ? "text-success" : "text-danger"
                      }
                    >
                      {row.orderStatus ? "" : "Refund Initiated"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MyTable>
          ) : (
            <h6 className="text-danger">Cancel a Order to View</h6>
          )}
        </Box>
      </UserLayout>
    </>
  );
}

export default MyBookings;
