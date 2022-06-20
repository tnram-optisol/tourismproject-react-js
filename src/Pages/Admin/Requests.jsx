import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  adminApproveRequest,
  adminRejectRequest,
  getUserRequest,
} from "Services/api/adminAPI";
import MyTable from "Component/Table/MyTable";
import { REQUEST_TABLE_FIELDS } from "utils/Table/tableFields";
import AdminLayout from "Component/Wrapper/AdminLayout";
import Loader from "Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAdminRequestData } from "store/reducers/adminReducer";

function Requests(props) {
  let sequence = 1;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.value.loading);
  const requestData = useSelector((state) => state.admin.value.requests);
  const getRequest = () => {
    dispatch(getAdminRequestData());
  };
  useEffect(() => {
    dispatch(getAdminRequestData());
  }, [dispatch]);
  const approveStatus = (data) => {
    const role = data.user.role.id;
    if (role === 2) {
      adminApproveRequest({
        user: data.user.id,
        role: data.user.role.id,
        status: true,
        property: data.hotel_id,
        sequence: sequence + 1,
      })
        .then((res) => {
          getRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      adminApproveRequest({
        user: data.user.id,
        role: data.user.role.id,
        status: true,
        property: data.tour_id,
        sequence: sequence + 1,
      })
        .then((res) => {
          getRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const rejectStatus = (data) => {
    adminRejectRequest({
      user: data.user.id,
      role: data.user.role.id,
      status: false,
      sequence: sequence + 1,
    })
      .then((res) => {
        getRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <AdminLayout>
      {!loading ? (
        <Box>
          <MyTable>
            <TableHead>
              <TableRow>
                {REQUEST_TABLE_FIELDS.map((el) => (
                  <TableCell
                    key={el}
                    sx={
                      el === "Actions"
                        ? { width: "20%", textAlign: "center" }
                        : { width: "20%" }
                    }
                    colSpan={el === "Actions" ? 2 : 0}
                  >
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {requestData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.user.role.role}</TableCell>
                  <TableCell>{data.user.name}</TableCell>
                  <TableCell>
                    {data.hotel_name ? data.hotel_name : data.package_name}
                  </TableCell>
                  <TableCell>
                    {data.hotel_license
                      ? data.hotel_license
                      : data.provider_license}
                  </TableCell>
                  <TableCell>
                    {data.status ? "Approved" : "Not Approved"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        approveStatus(data);
                      }}
                    >
                      Approval
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        rejectStatus(data);
                      }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MyTable>
        </Box>
      ) : (
        <Loader />
      )}
    </AdminLayout>
  );
}

export default Requests;
