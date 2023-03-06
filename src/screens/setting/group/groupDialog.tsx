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
import { useUpdateGroupMutation } from "../../../features/api/groupApi";
import {
  getOneGroup,
  getGroupById
} from "../../../features/slices/groupSlice";
import { useSelector } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
  
  export function GroupDialog(props: any) {
  
    const closeDialogEdit = () => {
      props.setOpenEdit(false);
    };
 
    const activeGp = useSelector(getOneGroup);
    const gp = useSelector(getGroupById(Number(activeGp)));
  
    useEffect(() => {
      const gpId = activeGp;
      if (gp) {
        setValue("name", "afdsf");
      }
      console.log(gp)
    }, [activeGp]);
     
    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormInputs>();
  
    const [updateGroup, { isLoading: isUpdating }] = useUpdateGroupMutation();

    const [loading, setLoading] = useState(false);
  
    const updateGroupForm = async (data: any) => {
      let payload = {
        id: gp.id,
        name: data.name,
      };
      updateGroup(payload);
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
        <DialogTitle>Edit Group</DialogTitle>
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
                <FormLabel sx={{ color: "#504E4E" }}>Group Name</FormLabel>
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
            onClick={handleSubmit(updateGroupForm)}
          >
             {isUpdating ? "" : "Submit"}
          </LoadingButton> 
        </DialogActions>
      </Dialog>
    );
  }
  
  export interface FormInputs {
    name: string;
  }
  