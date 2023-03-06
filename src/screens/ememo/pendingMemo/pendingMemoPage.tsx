import {
  Box,
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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { primaryColor } from "../../../constants/styles";
import { Controller, get, useForm } from "react-hook-form";
import * as fns from "date-fns";

const DivTitle = styled("div")({
  color: "white",
  fontWeight: "bold",
});

export function PendingMemoPage() {

  const tableHeaders = ["Date", "Subject", "MemoType", "Department", "Status"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            paddingTop: "16px",
          }}
        >
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header, key) => (
                    <TableCell
                      sx={{
                        bgcolor: "#fafafa",
                        fontWeight: "bold",
                      }}
                      align="right"
                      key={key}
                    >
                      {header}
                      {/* {isLoading ? (
                        <Box sx={{ width: "100%" }}>
                          <LinearProgress />
                        </Box>
                      ) : (
                        <Box sx={{ width: "100%" }}></Box>
                      )} */}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </form>
    </>
  );
}
