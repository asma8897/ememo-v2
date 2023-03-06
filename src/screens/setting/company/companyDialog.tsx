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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { primaryColor } from "../../../constants/styles";
import { Controller, useForm } from "react-hook-form";
import * as fns from "date-fns";
import { useUpdateCompanyMutation } from "../../../features/api/companyApi";
import {
  getOneCompany,
  getCompanyById
} from "../../../features/slices/companySlice";
import { useSelector } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
  
  export function CompanyDialog(props: any) {
  
    const closeDialogEdit = () => {
      props.setOpenEdit(false);
    };
 
    const activeCompany = useSelector(getOneCompany);
    const comp = useSelector(getCompanyById(Number(activeCompany)));
  
    useEffect(() => {
      const companyId = activeCompany;
      if (comp) {
        setValue("name", comp.name);
        setValue("status", comp.status === "ACTIVE" ? true : false);
      }
    }, [activeCompany]);
    
    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormInputs>();
  
    const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

    const [loading, setLoading] = useState(false);
  
    const updateCompanyForm = async (data: any) => {
      let payload = {
        id: comp.id,
        name: data.name,
        status: data.status ? "ACTIVE" : "DEACTIVE",
      };
      updateCompany(payload);
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
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox 
                            onChange={onChange} 
                            checked={value} 
                          />
                        }
                        label="Active"
                      />
                    )}
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
            onClick={handleSubmit(updateCompanyForm)}
          >
             {isUpdating ? "" : "Submit"}
          </LoadingButton> 
          {/* { isUpdating ? (
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
            onClick={handleSubmit(updateCompanyForm)}
          >
          </LoadingButton> ) : (
            "Submit"
          )} */}
        </DialogActions>
      </Dialog>
    );
  }
  
  export interface FormInputs {
    name: string;
    status: boolean;
  }
  