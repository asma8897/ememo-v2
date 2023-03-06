import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetAllEmemoQuery } from "../../../features/api/eMemoApi";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../../app/store";
import { auth } from "../../../firebase";
import { login, logout } from "../../../features/slices/userSlice";

export function SubmissionPage() {

  const tableHeaders = ["Date", "Subject", "Company", "Memo Type", "Status"];
  const { data: Ememo, isLoading } = useGetAllEmemoQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navigateToDetail = (id: number) => {
    navigate(`${pathname}/${id}`);
  };

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (userAuth) => {
  //     if (userAuth) {
  //       dispatch(
  //         login({
  //           email: userAuth.email,
  //           uid: userAuth.uid,
  //           displayName: userAuth.displayName,
  //           photoUrl: userAuth.photoURL,
  //         })
  //       );
  //     } else {
  //       dispatch(logout());
  //       console.log("user is logged out");
  //     }
  //   });
  // }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          paddingTop: "16px",
        }}
      >
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <TableContainer sx={{ maxHeight: "100%" }} component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header, idx) => (
                    <TableCell
                      sx={{
                        bgcolor: "#fafafa",
                        fontWeight: "bold",
                      }}
                      align="left"
                      key={idx}
                    >
                      {header}
                      { 
                        isLoading ? ( <Box sx={{ width: '100%' }}><LinearProgress /></Box>) : (<Box sx={{ width: '100%' }}></Box>)
                      }
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Ememo?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <TableRow
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#FFECEA",
                          transition: "200ms ease-in-out",
                        },
                      }}
                      key={row.id}
                      onClick={() => navigateToDetail(row.id)}
                    >
                      {/* <Link to="1"> */}
                      <TableCell align="left">
                        {format(new Date(row.createdOn), "dd MMM yyyy, hh:mm a")}
                      </TableCell>
                      <TableCell align="left">{row.subject}</TableCell>
                      <TableCell align="left">{row.company.name}</TableCell>
                      <TableCell align="left">{row.memoType.name}</TableCell>
                      <TableCell align="left">{row.status.name}</TableCell>
                      {/* </Link> */}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
        </Box>
      </Box>
    </>
  );
}
  