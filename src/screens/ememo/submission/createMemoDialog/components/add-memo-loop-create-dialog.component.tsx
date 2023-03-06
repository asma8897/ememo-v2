import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { RootState, useAppDispatch } from "../../../../../app/store";
import { borderRadius, primaryColor } from "../../../../../constants/styles";
import { useGetAllUserQuery } from "../../../../../features/api/userApi";
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from "../../../../../model/user.model";
import { useSelector } from "react-redux";
import { addMemoLoopUser, closeCreateMemoLoopDialog } from "../../../../../features/slices/create-memo-loop.slice";
import { Controller, useForm } from "react-hook-form";

export function AddMemoLoopCreateDialog() {
  const dispatch = useAppDispatch();
  const [ccPerson, setCcPerson] = useState<User | null>(null);
  const dialogOpen = useSelector(
    (state: RootState) => state.createMemoLoopDialog.memoLoopCreateDialogOpen
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: approverList, isLoading } = useGetAllUserQuery();

  const selectedApproversIds = useSelector((state: RootState) => 
    state.memoApprovalSlice.selectedApprovalList.map((approver) => approver.userId)
  )

  const filteredCCList = (ccPerson: User) => {
    var selectedCCPerson = approverList?.find((cc) => ccPerson.id === cc.id);
    
    const existingApprover = selectedApproversIds.find(
      (approverId) => ccPerson.id === approverId
    );

    if (selectedCCPerson || existingApprover ) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmission = () => {
    // console.log('On Submit')
    // console.log(ccPerson);
    if (ccPerson) {
      dispatch(addMemoLoopUser(ccPerson));
    }
    dispatch(closeCreateMemoLoopDialog());
  };
  
  const onCloseDialog = () => {
    dispatch(closeCreateMemoLoopDialog());
    setCcPerson(null);
  };

  const handleChange = (event: any) => {
    var selectedId = event.target.value;
    var selected = approverList?.find((app: User) => (app.id === selectedId));
    if (selected) {
      setCcPerson(selected);
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onClose={onCloseDialog} maxWidth="xl">
        <DialogTitle>CC To:</DialogTitle>
        <DialogContent>
          <FormControl
            sx={{
              marginBottom: "16px",
              width: "400px",
              flex: 1,
              borderRadius: borderRadius,
            }}
            variant="outlined"
          >
            <Controller
              name="memoSelectedUserId"
              control={control}
              render={({ field }) => (
              <Select sx={{ border: "none" }}
                defaultValue=""
                onChange={(e) => handleChange(e)}
              >
                {/* {approverList?.filter((approver) => filteredCCList(approver)).map((person) => ( */}
                {approverList?.map((person, idx) => (
                  <MenuItem key={person.id} value={person.id}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar 
                          sx={{ 
                            backgroundColor: primaryColor,
                            width: "50px",
                            height: "50px",
                            marginRight: "8px",
                          }}
                        >
                          {person.name.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <Box display="flex" flexDirection="column">
                          <Box sx={{ fontWeight: "bold"}}>
                              {person.name}
                          </Box>
                          <div>{person.jobTitle}</div>
                        </Box>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              )}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          {/* <Button color="primary" onClick={onCloseDialog}>
              Cancel
          </Button> */}
          <Button
            sx={{
              backgroundColor: "#F16E5F",
              fontWeight: "bold",
              color: "white",
              "&:hover": {
                backgroundColor: primaryColor,
              },
              variant: "outlined",
            }}
            onClick={onCloseDialog}
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
            onClick={onSubmission}           
          >
            { isLoading ? (
            <CircularProgress size={24} color="inherit" />
            ) : (
            "Create CC"
            )}
          </LoadingButton> 
        </DialogActions>
      </Dialog>
    </>
  );
}
