import LocationOn from "@mui/icons-material/LocationOn";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { getTour } from "Services/api/userAPI";
import MyCardBody from "Component/Cards/MyCardBody";
import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCardMedia from "Component/Cards/MyCardMedia";
import AnimatedText from "Component/styled/AnimatedText";
import MyCard from "Component/Cards/MyCard";
import MyCarousel from "Layout/Carousel";
import ToursList from "Component/Tours/ToursList";
import { adminTour, paginateTour } from "Services/api/toursAPI";
import { useDispatch, useSelector } from "react-redux";
import { getAdminTourData, setAdminTourData } from "store/reducers/tourReducer";
import AdminLayout from "Component/Wrapper/AdminLayout";
import Loader from "Layout/Loader";

export default function ShowTours() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tour.value.adminTour);
  const loading = useSelector((state) => state.tour.value.loading);
  useEffect(() => {
    adminTour()
      .then((res) => {
        setMaxPage(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    paginateTour(page)
      .then((res) => {
        dispatch(setAdminTourData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const tourPagination = (current) => {
    setPage(current);
    if (current < maxPage) {
      paginateTour(current)
        .then((res) => {
          dispatch(setAdminTourData(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPage(page - 1);
      paginateTour(current)
        .then((res) => {
          dispatch(setAdminTourData(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const pages = () => {
    let items = [];
    let totalPage = 0;
    if (maxPage % 2 === 0) {
      totalPage = maxPage / 2;
    } else {
      totalPage = maxPage / 2 + 1;
    }
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item key={number} onClick={() => tourPagination(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  return (
    <>
      <AdminLayout>
        <ToursList>
          {!loading ? (
            tour.map((data) => (
              <MyCard
                sx={{ maxWidth: 500, margin: "10px", display: "inline-block" }}
                key={data.tour ? data.tour.tour_id : data.tour_id}
              >
                <MyCardHeader
                  title={data.tour ? data.tour.package_name : data.package_name}
                />
                <MyCardMedia
                  img={data.tour ? data.tour.tour_image : data.tour_image}
                  alt={data.tour ? data.tour.package_name : data.package_name}
                />
                <CardContent>
                  <Typography variant="subtitle1" color="brown">
                    <LocationOn /> {data.tour ? data.tour.from : data.from} ---{" "}
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
                        ? new Date(data.tour.startDate).toLocaleDateString()
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
                  <AnimatedText
                    className={"m-2 text-danger"}
                    data={`₹​  ${
                      data.tour ? data.tour.cost : data.cost
                    } /person`}
                  />
                  <MyCardBody
                    variant={"body1"}
                    data={`  Status: ​ ${
                      data.tour
                        ? data.tour.status
                        : data.status
                        ? "Approved"
                        : "Not Approved"
                    } `}
                    color={
                      data.tour
                        ? data.tour.status
                        : data.status
                        ? "green"
                        : "red"
                    }
                  />
                </CardContent>
                <CardActions>
                  <Button className="button">
                    <Link
                      to={`/add/tours/${
                        data.tour ? data.tour.tour_id : data.tour_id
                      }`}
                      className="nav-link"
                    >
                      Update
                    </Link>
                  </Button>
                </CardActions>
              </MyCard>
            ))
          ) : (
            <Loader />
          )}
        </ToursList>
        {
          !loading ? <Pagination className="paginate">{pages()}</Pagination> :""
        }
      </AdminLayout>
    </>
  );
}
