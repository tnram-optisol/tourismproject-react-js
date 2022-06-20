import React, { useEffect } from "react";
import { Box, CardContent, Grid, Typography } from "@mui/material";
import "../Main.css";
import { LocationOn } from "@mui/icons-material";
import MyCardHeader from "Component/Cards/MyCardHeader";
import { Link, useLocation } from "react-router-dom";
import MyCardMedia from "Component/Cards/MyCardMedia";
import LazyLoad from "react-lazyload";
import MyCard from "Component/Cards/MyCard";
import TourCategory from "Layout/TourCategory";
import { useDispatch, useSelector } from "react-redux";
import { getUserTourData, setUserTourData } from "store/reducers/tourReducer";
import { filterTourData, searchTourData } from "Services/api/userAPI";
import MyCardBody from "Component/Cards/MyCardBody";
import Loader from "Layout/Loader";
import UserLayout from "Component/Wrapper/UserLayout";

export default function Tours(props) {
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("location");
  const tourData = useSelector((state) => state.tour.value.tour);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!query) {
      searchTourData(query)
        .then((res) => {
          dispatch(setUserTourData(res.data));
          window.scrollTo(0, 0);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(getUserTourData());
    }
  }, [dispatch]);
  const filterData = (category) => {
    console.log(category);
    window.scrollTo(0, 0);
    filterTourData(category)
      .then((res) => {
        dispatch(setUserTourData(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <UserLayout>
        <TourCategory filterData={filterData} />
        <Box className="tour">
          <Grid container spacing={1}>
            {tourData.length > 0
              ? tourData.map((data, index) => (
                  <LazyLoad key={data.sequence} placeholder={<Loader />}>
                    <MyCard value={index}>
                      <MyCardMedia
                        img={data.tour ? data.tour.tour_image : data.tour_image}
                        alt={
                          data.tour ? data.tour.package_name : data.package_name
                        }
                        className={"card-img ripple"}
                      />
                      <Link
                        to={`/tour/${
                          data.tour ? data.tour.tour_id : data.tour_id
                        }`}
                        className="nav-link"
                      >
                        <MyCardHeader
                          title={
                            data.tour
                              ? data.tour.package_name
                              : data.package_name
                          }
                        />
                      </Link>
                      <CardContent>
                        <Typography variant="subtitle1" color="brown">
                          <LocationOn />{" "}
                          {data.tour ? data.tour.from : data.from} ---{" "}
                          {data.tour ? data.tour.to : data.to}
                        </Typography>
                        <MyCardBody
                          variant={"body1"}
                          data={` Max Person: ${
                            data.tour ? data.tour.max_person : data.max_person
                          }`}
                          color={"green"}
                        />
                        <MyCardBody
                          variant={"body1"}
                          data={` Total Days : ${
                            data.tour ? data.tour.total_days : data.total_days
                          }`}
                          color={"green"}
                        />
                        <MyCardBody
                          variant={"body1"}
                          data={`  Booking Start Date : ${
                            data.tour
                              ? new Date(
                                  data.tour.startDate
                                ).toLocaleDateString()
                              : new Date(data.startDate).toLocaleDateString()
                          }`}
                          color={"blue"}
                        />
                        <MyCardBody
                          variant={"body1"}
                          data={`  Booking End Date: ${
                            data.tour ? data.tour.endDate : data.endDate
                          }`}
                          color={"success"}
                        />
                        <Typography
                          variant="subtitle1"
                          className={"m-2 text-danger"}
                        >
                          {`₹​  ${
                            data.tour ? data.tour.cost : data.cost
                          } /person`}
                        </Typography>
                      </CardContent>
                    </MyCard>
                  </LazyLoad>
                ))
              : ""}
          </Grid>
        </Box>
      </UserLayout>
    </>
  );
}
