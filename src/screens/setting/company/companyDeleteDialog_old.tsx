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
  import { Controller, useForm } from "react-hook-form";
  import * as fns from "date-fns";
  import { useDispatch, useSelector } from "react-redux";
  import { RootState, useAppDispatch } from "../../../app/store";
  import {
    // getAllCompany,
    getLoading,
    fetchAllCompanyAPI,
    updateCompanyAPI,
    getCompanyById,
    getOneCompany,
  } from "../../../features/slices/companySlice";
  
  export function CompanyDeleteDialog(props: any) {
    // const allCompanyData = useSelector(getAllCompany);
    const apiStatus = useSelector(getLoading);
    const dispatch = useAppDispatch();
    const activeCompany = useSelector(getOneCompany);
    // const comp = useSelector(getCompanyById(Number(activeCompany)));
    
    const [openDelete, setOpenDelete] = useState(props.openDelete);
    const openDialogDelete = () => setOpenDelete(true);
  
    const closeDialogDelete = () => {
      props.setOpenDelete(false);
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
  
    useEffect(() => {
      const compId = activeCompany;
  
      // if(comp){
      //   setValue("name", comp.name);
      //   setValue("status", comp.status);
      // }
      
    }, [activeCompany]);
  
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={props.openDelete}
        onClose={() => {
          props.closeDeleteModalHandler();
        }}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          dividers
        >
            <DialogContentText>
                Are you sure to delete item?
            </DialogContentText>
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
            onClick={() => {
              props.closeDeleteModalHandler();
            }}
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
            onClick={() => {
              props.confirmDeleteHandler();
            }}
            color="primary"
            disabled={apiStatus === "pending"}
          >
            
            {apiStatus === "pending" ? "Deleting....." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export interface FormInputs {
    name: string;
    status: string;
  }