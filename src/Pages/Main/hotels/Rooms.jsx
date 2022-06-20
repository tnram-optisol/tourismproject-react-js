import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { getRooms } from "Services/api/userAPI";
import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCardMedia from "Component/Cards/MyCardMedia";
import MyCardBody from "Component/Cards/MyCardBody";
import AnimatedText from "Component/styled/AnimatedText";
import { useDispatch, useSelector } from "react-redux";
import { getUserRoomData } from "store/reducers/hotelReducer";
import UserLayout from "Component/Wrapper/UserLayout";

export default function Rooms(props) {
  const query = useParams();
  const hotel_id = +query.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.hotel.value.room);
  useEffect(() => {
    dispatch(getUserRoomData(hotel_id));
    window.scrollTo(0, 0);
  }, [dispatch]);

  const bookNow = (id) => {
    navigate(`/show/room/${id}`);
  };

  return (
   <UserLayout>
      <Box className="tour_body">
      <Box>
        {rooms.map((room, index) => (
          <Card
            sx={{ maxWidth: 400, margin: "10px", display: "inline-block" }}
            key={room.room_id}
          >
            <Link to={`/show/room/${room.room_id}`} className="nav-link">
              <MyCardHeader title={room.room_name} />
            </Link>
            <MyCardMedia img={room.room_image} alt={room.room_name} />
            <CardContent>
              <Typography variant="h6">
                <FontAwesomeIcon icon={faUser} />
                <MyCardBody
                  variant={"body1"}
                  data={` Max Person: ${room.max_person}`}
                  color={"green"}
                />
              </Typography>
              <Typography variant="h6">
                <FontAwesomeIcon icon={faWallet} />
                <AnimatedText
                  data={`  Price: ₹​ ${room.room_price} /person for 1 Nights`}
                />
              </Typography>
              <Typography variant="body1">
                Availablity:{" "}
                {room.availablity ? "Available - 5" : "Not Available"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => bookNow(room.room_id)}
              >
                Book Now
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
   </UserLayout>
  );
}
