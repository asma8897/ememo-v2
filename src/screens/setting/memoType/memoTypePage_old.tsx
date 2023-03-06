import {
  Box,
  Button,
  Checkbox,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { primaryColor } from "../../../constants/styles";
import { Controller, get, useForm } from "react-hook-form";
import * as fns from "date-fns";
import { MemoTypeDialog } from "./memoTypeDialog_old";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import {
  getAllMemoType,
  getLoading,
  fetchAllMemoTypeAPI,
  createNewMemoTypeAPI,
  getOneMemoType,
  setId,
  deleteMemoTypeAPI,
} from "../../../features/slices/memoTypeSlice";
import { MemoTypeDeleteDialog } from "./memoTypeDeleteDialog_old";

const DivTitle = styled("div")({
  color: "white",
  fontWeight: "bold",
});

export function MemoTypePage() {
  const allMemoTypeData = useSelector(getAllMemoType);
  const apiStatus = useSelector(getLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allMemoTypeData.length == 0) {
      dispatch(fetchAllMemoTypeAPI(0));
    }
  }, []);

  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const openDialogEdit = () => setOpenEdit(true);
  const closeDialogEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = useState(false);
  const openDialogDelete = () => setOpenDelete(true);
  const closeDialogDelete = () => setOpenDelete(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(0);

  const openDeleteModalHandler = (id: any) => {
    setOpenDelete(true);
    setItemIdToDelete(id);
  };

  const closeDeleteModalHandler = () => {
    setOpenDelete(false);
    setItemIdToDelete(0);
  };

  const confirmDeleteHandler = () => {
    dispatch(deleteMemoTypeAPI(itemIdToDelete))
      .unwrap()
      .then(() => {
        setOpenDelete(false);
        setItemIdToDelete(0);
      });
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      createdOn: "",
      updatedOn: "",
      status: "ACTIVE",
      createdById: "",
      updatedById: "",
      deletedById: "",
      deletedOn: "",
    },
  });

  const ceateNewMemoTypeForm = (data: any) => {
    let payload = {
      name: data.name,
      createdOn: data.createdOn,
      updatedOn: data.updatedOn,
      status: data.status,
      createdById: data.createdById,
      updatedById: data.updatedById,
      deletedById: data.deletedById,
      deletedOn: data.deletedOn,
    };
    dispatch(createNewMemoTypeAPI(payload)).unwrap();
  };

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

  const tableHeaders = [
    "No",
    "Memo Type Name",
    "Status",
    "Created On",
    "Updated On",
    "Action",
  ];

  return (
    <>
      <MemoTypeDialog openEdit={openEdit} setOpenEdit={setOpenEdit} />
      <MemoTypeDeleteDialog
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        apiStatus={apiStatus}
        closeDeleteModalHandler={closeDeleteModalHandler}
        confirmDeleteHandler={confirmDeleteHandler}
      /> 
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={closeDialog}
      >
        <DialogTitle>Add New MemoType</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          dividers
        >
          <Box
            sx={{
              maxWidth: "80%",
              width: "60%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                flexDirection="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& > :not(style)": { m: 1 },
                }}
              >
                <FormLabel component="legend">Status</FormLabel>
                <FormGroup>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormControlLabel
                        {...field}
                        control={<Checkbox />}
                        label="Active"
                      />
                    )}
                  />
                </FormGroup>
                <FormLabel sx={{ color: "#504E4E" }}>MemoType Name</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{
                        "& label.Mui-focused": {
                          display: "none",
                        },
                        [`& fieldset`]: {
                          borderRadius: "10px",
                          width: "100%",
                        },
                      }}
                      variant="outlined"
                      type="text"
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#F16E5F",
              fontWeight: "bold",
              color: "white",
              "&:hover": {
                backgroundColor: primaryColor,
              },
              variant: "contained",
            }}
            onClick={closeDialog}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "#F16E5F",
              fontWeight: "bold",
              color: "white",
              "&:hover": {
                backgroundColor: primaryColor,
              },
              variant: "contained",
            }}
            onClick={handleSubmit(ceateNewMemoTypeForm)}
            color="primary"
            disabled={apiStatus === "pending"}
          >
            {apiStatus === "pending" ? "Submit..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <form>
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              backgroundColor: "#F16E5F",
              fontWeight: "bold",
              color: "white",
              "&:hover": {
                backgroundColor: primaryColor,
              },
              variant: "contained",
            }}
            onClick={openDialog}
          >
            <Box sx={{ display: "flex" }}>
              <AddIcon
                sx={{
                  marginRight: "16px",
                  color: "white",
                }}
              />
              <DivTitle>Add Memo Type</DivTitle>
            </Box>
          </Button>
        </Box>
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
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allMemoTypeData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">
                        {fns.format(
                          new Date(),
                          "yyyy-MM-dd HH:mm:ss"
                          // row.createdOn
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {fns.format(
                          new Date(),
                          "yyyy-MM-dd HH:mm:ss"
                          // row.updatedOn
                        )}
                      </TableCell>
                      <TableCell align="right" key={row.id}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            sx={{
                              backgroundColor: "#F16E5F",
                              fontWeight: "bold",
                              color: "white",
                              "&:hover": {
                                backgroundColor: primaryColor,
                              },
                              variant: "contained",
                            }}
                            onClick={() => {
                              dispatch(setId(row.id));
                              openDialogEdit();
                            }}
                            color="primary"
                            startIcon={<EditIcon />}
                          ></Button>
                          <Button
                            sx={{
                              backgroundColor: "#F16E5F",
                              fontWeight: "bold",
                              color: "white",
                              "&:hover": {
                                backgroundColor: primaryColor,
                              },
                              variant: "contained",
                            }}
                            onClick={() => {
                              openDeleteModalHandler(row.id);
                            }}
                            color="primary"
                            startIcon={<DeleteIcon />}
                          ></Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allMemoTypeData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </form>
    </>
  );
}
