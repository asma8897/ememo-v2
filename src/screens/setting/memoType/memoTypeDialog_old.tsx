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
import * as fns from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import {
  getAllMemoType,
  getLoading,
  fetchAllMemoTypeAPI,
  updateMemoTypeAPI,
  getMemoTypeById,
  getOneMemoType,
} from "../../../features/slices/memoTypeSlice";

export function MemoTypeDialog(props: any) {
  // const allMemoTypeData = useSelector(getAllMemoType);
  const apiStatus = useSelector(getLoading);
  const dispatch = useAppDispatch();
  const activeMemoTypeActive = useSelector(getOneMemoType);
  const memoType = useSelector(getMemoTypeById(Number(activeMemoTypeActive)));

  const [openEdit, setOpenEdit] = useState(props.openEdit);
  const openDialogEdit = () => setOpenEdit(true);

  const closeDialogEdit = () => {
    props.setOpenEdit(false);
  };

  // useEffect(() => {
  //   if (allMemoTypeData.length == 0) {
  //     dispatch(fetchAllMemoTypeAPI(0));
  //   }
  // }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const memoTypeId = activeMemoTypeActive;
    if (memoType) {
      setValue("name", memoType.name);
      setValue("status", memoType.status);
    }
  }, [activeMemoTypeActive]);

  const updateMemoTypeForm = (data: any) => {
    let payload = {
      id: memoType.id,
      name: data.name,
      status: data.status === true ? "ACTIVE" : "DEACTIVE",
    };
    dispatch(updateMemoTypeAPI(payload)).unwrap();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={props.openEdit}
      onClose={closeDialogEdit}
    >
      <DialogTitle>Edit Memo Type</DialogTitle>
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
                  // defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      // {...field}
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
              <FormLabel sx={{ color: "#504E4E" }}>Memo Type Name</FormLabel>
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
          onClick={handleSubmit(updateMemoTypeForm)}
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
