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
import { primaryColor } from "../../../constants/styles";
import { Controller, get, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import {
  getAllDepartment,
  getLoading,
  fetchAllDepartmentAPI,
  updateDepartmentAPI,
  getDepartmentById,
  getOneDepartment,
} from "../../../features/slices/departmentSlice";

export function DepartmentDialog(props: any) {
  const allDepartmentData = useSelector(getAllDepartment);
  const apiStatus = useSelector(getLoading);
  const dispatch = useAppDispatch();
  const activeDepartment = useSelector(getOneDepartment);
  const dept = useSelector(getDepartmentById(Number(activeDepartment)));

  const [openEdit, setOpenEdit] = useState(props.openEdit);
  const openDialogEdit = () => setOpenEdit(true);

  const closeDialogEdit = () => {
    props.setOpenEdit(false);
  };

  useEffect(() => {
    if (allDepartmentData.length == 0) {
      dispatch(fetchAllDepartmentAPI(0));
    }
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const deptId = activeDepartment;
    if (dept) {
      setValue("name", dept.name);
      setValue("status", dept.status);
    }
    // console.log(dept);
  }, [activeDepartment]);

  const updateDepartmentForm = (data: any) => {
    let payload = {
      id: dept.id,
      name: data.name,
      status: data.status === true ? "ACTIVE" : "DEACTIVE",
    };

    dispatch(updateDepartmentAPI(payload)).unwrap();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={props.openEdit}
      onClose={closeDialogEdit}
    >
      <DialogTitle>Edit Department</DialogTitle>
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
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={onChange}
                          value={value}
                        />
                      }
                      label="Active"
                    />
                  )}
                />
              </FormGroup>
              <FormLabel sx={{ color: "#504E4E" }}>Department Name</FormLabel>
              <Controller
                name="name"
                control={control}
                defaultValue=""
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
          onClick={closeDialogEdit}
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
          onClick={handleSubmit(updateDepartmentForm)}
          color="primary"
          disabled={apiStatus === "pending"}
        >
          {apiStatus === "pending" ? "Updating....." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface FormInputs {
  name: string;
  status: string;
}
