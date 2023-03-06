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
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { primaryColor } from "../../../constants/styles";
import { Controller, useForm } from "react-hook-form";
import * as fns from "date-fns";
import { useGetAllUserQuery, useUpdateUserMutation } from "../../../features/api/userApi";
import {
  getOneUser,
  getUserById
} from "../../../features/slices/userSlice";
import { useSelector } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
import { useGetAllCompanyQuery } from "../../../features/api/companyApi";
import { useGetAllDepartmentQuery } from "../../../features/api/departmentApi";
import { useGetAllGroupQuery } from "../../../features/api/groupApi";
    
export function UserDialog(props: any) {

  const closeDialogEdit = () => {
    props.setOpenEdit(false);
  };

  const activeUser = useSelector(getOneUser);
  const us = useSelector(getUserById(Number(activeUser)));
    
  useEffect(() => {
    const userId = activeUser;
    if (us) {
      setValue("name", us.name);
      setValue("jobTitle", us.jobTitle);
      setValue("departmentId", us.departmentId);
      setValue("companyId", us.companyId);
      setValue("groupId", us.groupId);
      setValue("status", us.status === "ACTIVE" ? true : false);
    }
    console.log(us);
  }, [activeUser]);
      
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();
    
  const { data: group } = useGetAllGroupQuery();
  const { data: department } = useGetAllDepartmentQuery();
  const { data: company } = useGetAllCompanyQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [loading, setLoading] = useState(false);

  const updateUserForm = async (data: any) => {
    let payload = {
      id: us.id,
      name: data.name,
      jobTitle: data.jobTitle,
      departmentId: data.departmentId,
      companyId: data.companyId,
      groupId: data.groupId,
      status: data.status ? "ACTIVE" : "DEACTIVE",
    };
    updateUser(payload);
    setLoading(true);
      setTimeout(() => {
        setLoading(false)
      }, 1000);
      props.setOpenEdit(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={props.openEdit}
      onClose={closeDialogEdit}
    >
    <DialogTitle>Edit User</DialogTitle>
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
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
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
                  label="User Name"
                  multiline
                />
              )}
            />
            <Controller
              name="jobTitle"
              control={control}
              defaultValue=""
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
              defaultValue=""
              control={control}
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
            />
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
        onClick={closeDialogEdit}
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
        onClick={handleSubmit(updateUserForm)}
      >
        {isUpdating ? "" : "Submit"}
      </LoadingButton> 
    </DialogActions>
  </Dialog>
  );
}
    
    export interface FormInputs {
      name: string;
      jobTitle: string;
      departmentId: any;
      companyId: any;
      groupId: any;
      status: boolean;
    }
    