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
  // getAllCompany,
  getLoading,
  fetchAllCompanyAPI,
  updateCompanyAPI,
  getCompanyById,
  getOneCompany
} from "../../../features/slices/companySlice";

export function CompanyDialog(props: any) {
  // const allCompanyData = useSelector(getAllCompany);
  const apiStatus = useSelector(getLoading);
  const dispatch = useAppDispatch();
  const activeCompany = useSelector(getOneCompany);
  // const comp = useSelector(getCompanyById(Number(activeCompany)));
  
  const [openEdit, setOpenEdit] = useState(props.openEdit);
  const openDialogEdit = () => setOpenEdit(true);

  const closeDialogEdit = () => {
    props.setOpenEdit(false);
  };

  // useEffect(() => {
  //   if (allCompanyData.length == 0) {
  //     dispatch(fetchAllCompanyAPI(0));
  //   }
  // }, []);

  const { 
    control, 
    handleSubmit, 
    setValue,
    formState: {errors}
  } = useForm<FormInputs>();

  // useEffect(() => {
  //   const compId = activeCompany;
  //   if(comp){
  //     console.log(`comp is`);
  //     console.log(comp);
  //     setValue("name", comp.name);
  //     setValue("status", comp.status === "ACTIVE" ? true : false);
  //   }
    
  //   // console.log(comp);
  // }, [activeCompany]);

  // const updateCompanyForm = (data: any) => {
  //   let payload = {
  //     id: comp.id,
  //     name: data.name,
  //     status: data.status ? "ACTIVE" : "DEACTIVE",
  //   };
 

  //   console.log(payload)
  //   dispatch(updateCompanyAPI(payload)).unwrap()
  // };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={props.openEdit}
      onClose={closeDialogEdit}
    >
      <DialogTitle>Edit Company</DialogTitle>
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
                  render={({ field: { onChange, value} }) => {
                    return (
                      <FormControlLabel
                        // {...field}
                        control={<Checkbox
                          onChange={onChange}
                          checked={value} />}
                        label="Active" />
                    );
                  }}
                />
              </FormGroup>
              <FormLabel sx={{ color: "#504E4E" }}>Company Name</FormLabel>
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
          // onClick={handleSubmit(updateCompanyForm)}
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
  status: boolean;
}