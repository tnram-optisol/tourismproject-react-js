import { Box, CardActions, CardContent, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MyCardBody from "Component/Cards/MyCardBody";
import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCard from "Component/Cards/MyCard";
import MyCardMedia from "Component/Cards/MyCardMedia";
import { getAdminHotelData } from "store/reducers/hotelReducer";
import AdminLayout from "Component/Wrapper/AdminLayout";
import Loader from "Layout/Loader";

function ViewHotel(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotel.value.hotel);
  const loading = useSelector((state) => state.hotel.value.loading);
  useEffect(() => {
    dispatch(getAdminHotelData());
  }, [dispatch]);

  const addRoom = (id) => {
    navigate(`/add/room/${id}`);
  };

  const viewRooms = (id) => {
    navigate(`/view/room/${id}`);
  };

  return (
    <AdminLayout>
      <Box className="tour">
        {loading ? (
          <Loader />
        ) : (
          hotels.map((hotel, index) => (
            <MyCard key={hotel.hotel_id}>
              <MyCardHeader title={hotel.hotel_name} />
              <MyCardMedia img={hotel.hotel_image} alt={hotel.hotel_name} />
              <CardContent>
                <MyCardBody
                  variant={"subtitle1"}
                  data={`Address: ${hotel.address}`}
                  color={"red"}
                />
                <MyCardBody
                  variant={"body1"}
                  data={`Latitude: ${hotel.latitude}`}
                  color={"green"}
                />
                <MyCardBody
                  variant={"body1"}
                  data={` Longitude: ${hotel.longitude}`}
                  color={"green"}
                />
                <MyCardBody
                  variant={"body1"}
                  data={`  Status: ​ ${
                    hotel.status ? "Approved" : "Not Approved "
                  }`}
                  color={hotel.status ? "green" : "red"}
                />
              </CardContent>
              <CardActions>
                <Button onClick={() => addRoom(hotel.hotel_id)}>
                  Add Room
                </Button>
                <Button onClick={() => viewRooms(hotel.hotel_id)}>
                  View Rooms
                </Button>
              </CardActions>
            </MyCard>
          ))
        )}
      </Box>
    </AdminLayout>
  );
}

export default ViewHotel;
