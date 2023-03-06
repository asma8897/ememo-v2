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
  import AddIcon from "@mui/icons-material/Add";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { primaryColor } from "../../../constants/styles";
  import axios from "axios";
  import { formatDistance, subDays } from "date-fns";
  import { Controller, useForm } from "react-hook-form";
  import * as fns from "date-fns";
  import { useUpdateProjectMutation } from "../../../features/api/projectApi";
  import {
    getOneProject,
    getProjectById
  } from "../../../features/slices/projectSlice";
  import { useSelector } from "react-redux";
  import LoadingButton from '@mui/lab/LoadingButton';
  
  export function ProjectDialog(props: any) {

    const closeDialogEdit = () => {
      props.setOpenEdit(false);
    };
  
    const activeProject = useSelector(getOneProject);
    const project = useSelector(getProjectById(Number(activeProject)));
  
    useEffect(() => {
      const projectId = activeProject;
      if (project) {
        setValue("name", project.name);
        setValue("status", project.status === "ACTIVE" ? true : false);
      }
    }, [activeProject]);
    
    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormInputs>();
  
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

    const [loading, setLoading] = useState(false);
  
    const updateProjectForm = async (data: any) => {
      let payload = {
        id: project.id,
        name: data.name,
        status: data.status ? "ACTIVE" : "DEACTIVE",
      };
      updateProject(payload);
      setLoading(true);
        setTimeout(() => {
          setLoading(false)
        }, 2000);
        props.setOpenEdit(false);
    };
  
    return (
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.openEdit}
        onClose={closeDialogEdit}
      >
        <DialogTitle>Edit Project</DialogTitle>
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
                <FormLabel sx={{ color: "#504E4E" }}>Project Name</FormLabel>
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
            onClick={handleSubmit(updateProjectForm)}
          >
             {isUpdating ? "Updating" : "Submit"}
          </LoadingButton> 
        </DialogActions>
      </Dialog>
    );
  }
  
  export interface FormInputs {
    name: string;
    status: boolean;
  }
  