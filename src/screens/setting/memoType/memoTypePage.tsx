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
    CircularProgress,
    LinearProgress,
    MenuItem,
    Select,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import AddIcon from "@mui/icons-material/Add";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { primaryColor } from "../../../constants/styles";
  import { Controller, get, useForm } from "react-hook-form";
  import { format } from "date-fns";
  import {
    useGetAllMemoTypeQuery,
    useAddNewMemoTypeMutation,
    useDeleteMemoTypeMutation
  } from "../../../features/api/memoTypeApi";
import { setId } from "../../../features/slices/memoTypeSlice";
import { MemoTypeDialog } from "./memoTypeDialog";
import { MemoTypeDeleteDialog } from "./memoTypeDeleteDialog";
import { useAppDispatch } from "../../../app/store";
import LoadingButton from '@mui/lab/LoadingButton';
import { useGetAllDepartmentQuery } from "../../../features/api/departmentApi";

  const DivTitle = styled("div")({
    color: "white",
    fontWeight: "bold",
  });
    
  export function MemoTypePage() {

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

    const { data: memoType, isLoading } = useGetAllMemoTypeQuery();
    const { data: department } = useGetAllDepartmentQuery();
    const [addNewMemoType] = useAddNewMemoTypeMutation();
    const [deleteMemoType] = useDeleteMemoTypeMutation();
    const [loading, setLoading] = useState(false);
    
    const { control, handleSubmit, reset } = useForm({
      defaultValues: {
        name: "",
        createdOn: "",
        updatedOn: "",
        status: "ACTIVE",
        createdById: "",
        updatedById: "",
        deletedById: "",
        deletedOn: "",
        departmentId: "",
      },
    });

    const ceateNewMemoTypeForm =  async (data: any) => {
      let payload = {
        name: data.name,
        createdOn: data.createdOn,
        updatedOn: data.updatedOn,
        status: data.status,
        createdById: data.createdById,
        updatedById: data.updatedById,
        deletedById: data.deletedById,
        deletedOn: data.deletedOn,
        departmentId: data.departmentId,
      };
      addNewMemoType(payload);
      setLoading(true);
        setTimeout(() => {
          setLoading(false)
        }, 2000);
        setOpen(false);
        reset({});
    };   

    const openDeleteModalHandler = (id: any) => {
      setOpenDelete(true);
      setItemIdToDelete(id);
    };

    const closeDeleteModalHandler = () => {
      setOpenDelete(false);
      setItemIdToDelete(0);
    };

    const confirmDeleteHandler = () => {
        deleteMemoType(itemIdToDelete)
        .then(() => {
          setOpenDelete(false);
          setItemIdToDelete(0);
        });
    };

    const dispatch = useAppDispatch();

    const tableHeaders = [
      "No",
      "Memo Type Name",
      "Department",
      "Status",
      "Created On",
      "Updated On",
      "Action",
    ];

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
        <MemoTypeDialog openEdit={openEdit} setOpenEdit={setOpenEdit} />
        <MemoTypeDeleteDialog
          openDelete={openDelete} 
          setOpenDelete={setOpenDelete}
          isLoading={isLoading} 
          closeDeleteModalHandler={closeDeleteModalHandler}
          confirmDeleteHandler={confirmDeleteHandler}
        />
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={open}
          onClose={closeDialog}
        >
          <DialogTitle>Add New Memo Type</DialogTitle>
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
                        control={
                          <Checkbox
                          />
                        }
                        label="Active"
                      />
                      )}
                    />
                  </FormGroup>
                  <FormLabel sx={{ color: "#504E4E" }}>Department</FormLabel>
                  <Controller
                    name="departmentId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl 
                        sx={{ 
                            width: "100%"
                        }}
                        variant="outlined"
                      >
                        <Select 
                          {...field} 
                          MenuProps={{
                            PaperProps: {
                              onScroll: (event: any) => {
                               
                              }
                            },
                            style: { maxHeight: 300 },
                            // id: "id-menu",
                            // anchorOrigin: {
                            //   vertical: "bottom",
                            //   horizontal: "left"
                            // },
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {department?.map((dept: any, deptIdx: any) => (
                            <MenuItem key={deptIdx} value={dept.id}>
                              {`${dept.name}`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Box>
                <Box
                  flexDirection="row"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& > :not(style)": { m: 1 },
                  }}
                >
                  <FormLabel sx={{ color: "#504E4E" }}>Memo Type Name</FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
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
                        multiline
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
            <LoadingButton
              sx={{
                backgroundColor: "#F16E5F",
                fontWeight: "bold",
                color: "white",
                "&:hover": {
                  backgroundColor: primaryColor,
                },
                variant: "contained",
              }}
              color="primary"
              loading={loading}
              onClick={handleSubmit(ceateNewMemoTypeForm)}
            >
             { isLoading ? (
              <CircularProgress size={24} color="inherit" />
             ) : (
              "Submit"
             )}
            </LoadingButton> 
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
                        { 
                          isLoading ? ( <Box sx={{ width: '100%' }}><LinearProgress /></Box>) : (<Box sx={{ width: '100%' }}></Box>)
                        }
                      </TableCell>
                    ))}
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {memoType?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => (
                      <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.department.name}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">
                          {format(new Date(row.createdOn), "dd MMM yyyy, hh:mm a")}
                        </TableCell>
                        <TableCell align="right">
                          {format(new Date(row.updatedOn), "dd MMM yyyy, hh:mm a")}
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
              count={memoType ? memoType.length :0}
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