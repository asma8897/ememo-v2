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
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  OutlinedInput,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { primaryColor } from "../../../constants/styles";
import { Controller, get, useForm } from "react-hook-form";
import * as fns from "date-fns";
import {
  useGetAllUserQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
} from "../../../features/api/userApi";
import {
  setId,
  login,
  logout,
  selectUser,
} from "../../../features/slices/userSlice";
import { UserDialog } from "./userDialog";
import { UserDeleteDialog } from "./userDeleteDialog";
import { useAppDispatch } from "../../../app/store";
import LoadingButton from "@mui/lab/LoadingButton";
import { useGetAllGroupQuery } from "../../../features/api/groupApi";
import { useGetAllDepartmentQuery } from "../../../features/api/departmentApi";
import { useGetAllCompanyQuery } from "../../../features/api/companyApi";
import { Theme, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  // createUserWithEmailAndPassword,
  // onAuthStateChanged,
} from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
const DivTitle = styled("div")({
  color: "white",
  fontWeight: "bold",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps1 = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const type = [
  { id: 1, name: "one" },
  { id: 2, name: "two" },
];

function getStyles(name: string, groupName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      groupName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function UserPage() {
  const person = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  //     }
  //   });
  // }, []);

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

  const { data: userList, isLoading } = useGetAllUserQuery();
  const { data: group } = useGetAllGroupQuery();
  const { data: department } = useGetAllDepartmentQuery();
  const { data: company } = useGetAllCompanyQuery();
  const [addNewUser] = useAddNewUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [loading, setLoading] = useState(false);

  // const theme = useTheme();

  const [groupSelected, setGroupSelected] = useState<any>([]);

  const [typeName, setTypeName] = useState<any>([]);

  // const handleChange1 = (event: SelectChangeEvent<typeof typeName>) => {
  //   console.log(event.target.value)
  //   const {
  //     target: { value },
  //   } = event;
  //   setTypeName(
  //     typeof value === "string" ? value.split(",") : value,
  //   );
  // };

  // const handleChange = (event: SelectChangeEvent<typeof groupSelected>) => {
  //   console.log(event.target.value)
  //   const {
  //     target: { value },
  //   } = event;
  //   setGroupSelected(
  //     typeof value === "string" ? value.split(",") : value,
  //   );
  // };

  const handleChange = (event: SelectChangeEvent<typeof groupSelected>) => {
    console.log(event.target.value);

    const {
      target: { value },
    } = event;
    setGroupSelected(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      uid: "",
      name: "",
      email: "",
      password: "",
      jobTitle: "",
      groupId: "",
      departmentId: "",
      companyId: "",
      createdOn: "",
      updatedOn: "",
      status: "ACTIVE",
      createdById: "",
      updatedById: "",
      deletedById: "",
      deletedOn: "",
    },
  });

  const ceateNewUserForm = async (data: any) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/login");

        let payload = {
          uid: userCredential.user.uid,
          name: data.name,
          jobTitle: data.jobTitle,
          email: data.email,
          password: data.password,
          groupId: data.groupId,
          departmentId: data.departmentId,
          companyId: data.companyId,
          createdOn: data.createdOn,
          updatedOn: data.updatedOn,
          status: data.status,
          createdById: data.createdById,
          updatedById: data.updatedById,
          deletedById: data.deletedById,
          deletedOn: data.deletedOn,
        };
        addNewUser(payload);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setOpen(false);
        reset({});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
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
    deleteUser(itemIdToDelete).then(() => {
      setOpenDelete(false);
      setItemIdToDelete(0);
    });
  };

  const tableHeaders = [
    "No",
    "User Name",
    "Group",
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
      <UserDialog openEdit={openEdit} setOpenEdit={setOpenEdit} />
      {/* <UserDeleteDialog
        openDelete={openDelete} 
        setOpenDelete={setOpenDelete} 
        // isLoading={isLoading} 
        closeDeleteModalHandler={closeDeleteModalHandler}
        confirmDeleteHandler={confirmDeleteHandler}
      /> */}
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={closeDialog}>
        <DialogTitle>Add New User</DialogTitle>
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
              // maxWidth: "80%",
              // width: "60%",
              width: "100%",
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
                // sx={{
                //   '& .MuiTextField-root': {
                //     m: 1,
                //     width: '30ch'
                //   },
                // }}
              >
                {/* <FormLabel sx={{ color: "#504E4E" }}>User Name</FormLabel> */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      sx={{
                        // "& label.Mui-focused": {
                        //   display: "none",
                        // },
                        [`& fieldset`]: {
                          borderRadius: "10px",
                          width: "100%",
                        },
                      }}
                      variant="outlined"
                      type="text"
                      label="Name"
                      multiline
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "10px",
                          width: "100%",
                        },
                      }}
                      variant="outlined"
                      type="text"
                      label="Password"
                      multiline
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "10px",
                          width: "100%",
                        },
                      }}
                      variant="outlined"
                      type="text"
                      label="Email"
                      multiline
                    />
                  )}
                />
                <Controller
                  name="jobTitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      sx={{
                        // "& label.Mui-focused": {
                        //   display: "none",
                        // },
                        [`& fieldset`]: {
                          borderRadius: "10px",
                          width: "100%",
                        },
                      }}
                      variant="outlined"
                      type="text"
                      label="Job Title"
                      multiline
                    />
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
                // sx={{
                //   '& .MuiTextField-root': {
                //     m: 1,
                //     width: '30ch'
                //   },
                // }}
              >
                <Controller
                  name="departmentId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl sx={{ m: 1 }} fullWidth>
                      <InputLabel>Department</InputLabel>
                      <Select
                        {...field}
                        label="Department"
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: "10px",
                            width: "100%",
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            onScroll: (event: any) => {},
                          },
                          style: { maxHeight: 300 },
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
                <Controller
                  name="companyId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl sx={{ m: 1 }} fullWidth>
                      <InputLabel>Company</InputLabel>
                      <Select
                        {...field}
                        label="Company"
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: "10px",
                            width: "100%",
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            onScroll: (event: any) => {},
                          },
                          style: { maxHeight: 300 },
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {company?.map((comp: any, compIdx: any) => (
                          <MenuItem key={compIdx} value={comp.id}>
                            {`${comp.name}`}
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
                <Controller
                  name="groupId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl sx={{ m: 1, width: "48%" }}>
                      <InputLabel>Group</InputLabel>
                      <Select
                        // {...field}
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: "10px",
                            width: "100%",
                          },
                        }}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "center",
                          },
                          keepMounted: true,
                          PaperProps: { style: { maxHeight: "300px" } },
                        }}
                        multiple
                        value={groupSelected}
                        // onChange={(event) => setGroupSelected(event.target.value)}
                        onChange={(event) => {
                          setGroupSelected(event.target.value);
                          onChange(event);
                        }}
                        // onChange={handleChange}
                        input={<OutlinedInput label="Group" />}
                        renderValue={(data) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {groupSelected.map((value: any) => (
                              <Chip
                                key={value}
                                label={
                                  group?.find((gr) => gr.id === value)?.name
                                }
                                onMouseDown={(event) => {
                                  event.stopPropagation();
                                }}
                                onDelete={() => {
                                  setGroupSelected((groupSelected: any) => [
                                    ...groupSelected.filter(
                                      (groupId: any) => groupId !== value
                                    ),
                                  ]);
                                  onChange([
                                    ...groupSelected.filter(
                                      (groupId: any) => groupId !== value
                                    ),
                                  ]);
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {group?.map((gp) => (
                          <MenuItem
                            key={gp.id}
                            value={gp.id}
                            // style={getStyles(gp.name, groupName, theme)}
                          >
                            {gp.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                {/* <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={typeName}
                    onChange={handleChange1}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value: any) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps1}
                  >
                    {type.map((ty) => (
                      <MenuItem
                        key={ty.id}
                        value={ty.id}
                      >
                        {ty.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                {/* <Controller
                  name="groupId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl sx={{ m: 1, width:"48%"}}>
                      <InputLabel>Group</InputLabel>
                      <Select
                        {...field} 
                        label="Group"
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: "10px",
                            width: "100%"
                          }
                        }}
                        MenuProps={{
                          PaperProps: {
                            onScroll: (event: any) => {
                            }
                          },
                          style: { maxHeight: 300 },
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {group?.map((gp: any, gpIdx: any) => (
                          <MenuItem key={gpIdx} value={gp.id}>
                            {`${gp.name}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                /> */}
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
            onClick={handleSubmit(ceateNewUserForm)}
          >
            {isLoading ? (
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
              <DivTitle>Add User</DivTitle>
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
                      {isLoading ? (
                        <Box sx={{ width: "100%" }}>
                          <LinearProgress />
                        </Box>
                      ) : (
                        <Box sx={{ width: "100%" }}></Box>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {userList
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.groups.name}</TableCell>
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
            count={userList ? userList.length : 0}
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
