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
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { primaryColor } from "../../../constants/styles";
  import { Controller, useForm } from "react-hook-form";
  import * as fns from "date-fns";
  import { useUpdateMemoTypeMutation } from "../../../features/api/memoTypeApi";
  import {
    getOneMemoType,
    getMemoTypeById
  } from "../../../features/slices/memoTypeSlice";
  import { useSelector } from "react-redux";
  import LoadingButton from '@mui/lab/LoadingButton';  
  import { useGetAllDepartmentQuery } from "../../../features/api/departmentApi";

  export function MemoTypeDialog(props: any) {

    const closeDialogEdit = () => {
      props.setOpenEdit(false);
    };
  
    const activeMemoType = useSelector(getOneMemoType);
    const memoty = useSelector(getMemoTypeById(Number(activeMemoType)));
    console.log(memoty);
  
    useEffect(() => {
      const memoTypeId = activeMemoType;
      if (memoty) {
        setValue("name", memoty.name);
        setValue("status", memoty.status === "ACTIVE" ? true : false);
        setValue("departmentId", memoty.departmentId);
      }
    }, [activeMemoType]);
    
    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormInputs>();
  
    const [updateMemoType, { isLoading : isUpdating }] = useUpdateMemoTypeMutation();
    const { data: department, isLoading: isLoadingDepartment } = useGetAllDepartmentQuery();

    const [loading, setLoading] = useState(false);
  
    const updateMemoTypeForm = (data: any) => {
      let payload = {
        id: memoty.id,
        name: data.name,
        status: data.status ? "ACTIVE" : "DEACTIVE",
        departmentId: data.departmentId,
      };
      updateMemoType(payload);
      setLoading(true);
        setTimeout(() => {
          setLoading(false)
        }, 2000);
        props.setOpenEdit(false);
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
                <FormLabel sx={{ color: "#504E4E" }}>Department</FormLabel>
                <Controller
                  name="departmentId"
                  control={control}
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
                          style: { maxHeight: 300 },
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {department?.map((dept, deptIdx) => (
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
                  defaultValue=""
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
            onClick={handleSubmit(updateMemoTypeForm)}
          >
             {isUpdating ? "" : "Submit"}
          </LoadingButton> 
        </DialogActions>
      </Dialog>
    );
  }
  
  export interface FormInputs {
    name: string;
    status: boolean;
    departmentId: number;
  }
  