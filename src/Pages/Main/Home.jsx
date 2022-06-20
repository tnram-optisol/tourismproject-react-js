import { Box, CardContent, Grid, Rating, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCardMedia from "Component/Cards/MyCardMedia";
import { filterTourData } from "Services/api/userAPI";
import "./Main.css";
import { LocationOn } from "@mui/icons-material";
import LazyLoad from "react-lazyload";
import TourCategory from "Layout/TourCategory";
import { toast, ToastContainer } from "react-toastify";
import Loader from "Layout/Loader";
import MyCard from "Component/Cards/MyCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserTourData, setUserTourData } from "store/reducers/tourReducer";
import UserLayout from "Component/Wrapper/UserLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Home(props) {
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("location");
  const tourData = useSelector((state) => state.tour.value.tour);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserTourData());
  }, []);
  const filterData = (category) => {
    console.log(category);
    window.scrollTo(0, 0);
    if (category !== 0) {
      filterTourData(category)
        .then((res) => {
          dispatch(setUserTourData(res.data));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(getUserTourData());
    }
  };
  return (
    <>
      <UserLayout>
        <ToastContainer />
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
                        className={"card-img ripple "}
                      />
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
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
                        </Grid>
                        <Grid item xs={3} className="mt-4">
                          {data.rating ? (
                            <>
                              {data.rating}
                              <FontAwesomeIcon icon={faStar} color="yellow" />
                            </>
                          ) : (
                            <>
                              New 
                              <FontAwesomeIcon icon={faStar} color="yellow" />
                            </>
                          )}
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography variant="subtitle1" color="brown">
                          <LocationOn />{" "}
                          {data.tour ? data.tour.from : data.from} ---{" "}
                          {data.tour ? data.tour.to : data.to}
                        </Typography>
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
