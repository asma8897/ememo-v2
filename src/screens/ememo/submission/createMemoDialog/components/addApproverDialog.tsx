import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { borderRadius, primaryColor } from "../../../../../constants/styles";
import { Controller, useForm } from "react-hook-form";
import { useGetAllGroupQuery } from "../../../../../features/api/groupApi";
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch } from "../../../../../app/store";
import { RootState } from "../../../../../app/store";
import { useSelector } from "react-redux";
import { 
  addSelectedApprovalList, 
  setApproverDialog, 
  setEmptyApprovalError 
} from "../../../../../features/slices/memoApprovalListSlice";
import { Group } from "../../../../../model/group.model";
import { User } from "../../../../../model/user.model";

export function AddApproverDialog() {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dialogOpen = useSelector(
    (state: RootState) => state.memoApprovalSlice.approverDialogStatus
  );

  const selectedApprovers = useSelector(
    (state: RootState) => state.memoApprovalSlice.selectedApprovalList
  )

  const { data: approverGroup } = useGetAllGroupQuery();

  const [activeApprover, setActiveApprover] = useState<Group | null>(null);
  
  const selectedCCPersonId = useSelector((state: RootState) => 
    state.createMemoLoopDialog.selectedMemoLoopUsers.map((cc) => cc.id)
  );

  function filteredApproval(ccApprover: User) {
    const ccPersonIden = selectedCCPersonId.find(
      (ccId) => ccApprover.id === ccId
    );

    if (ccPersonIden) {
      return false;
    } else {
      return true;
    }
  }

  const onSelectedApprover = (event: any) => {
    var selectedApprovedId = event.target.value;
    var selectedApprover = approverGroup?.find((approver: Group) => approver.id === selectedApprovedId)
    if (selectedApprover) {
      setActiveApprover(selectedApprover);
    }
  };

  function onSubmitApprover(data: any) {
    if (activeApprover) {
      dispatch(
        addSelectedApprovalList({
          groupData: activeApprover
        })
      );
      setActiveApprover(null);
    } else {
      dispatch(setEmptyApprovalError(true));
    }
  }

  return (
    <>
      <Dialog 
        open={dialogOpen} 
        maxWidth="xl" 
        onClose={() => dispatch(setApproverDialog(false))}
      >
        <DialogContent>
          <DialogTitle>Select your approver</DialogTitle>
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
              name="groupId"
              control={control}
              render={({ field }) => (
                <Select
                  sx={{ border: "none" }}
                  variant="outlined"
                  defaultValue=""
                  onChange={(e) => onSelectedApprover(e)}
                >
                  {approverGroup?.map((approver) => (
                    <MenuItem key={approver.id} value={approver.id}>
                      <Box display="flex" alignItems="center">
                        <Avatar 
                          sx={{ 
                            backgroundColor: primaryColor,
                            width: "50px",
                            height: "50px",
                            marginRight: "8px",
                          }}
                        >
                          {approver.name.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <Box display="flex" flexDirection="column">
                          <Box sx={{ fontWeight: "bold" }}>{approver.name}</Box>
                          {/* {userSelected?.map((us: any) => (
                            <p key={us.id}>{us.name}</p>
                          ))} */}
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
            color="primary"
            onClick={() => dispatch(setApproverDialog(false))}
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
            onClick={handleSubmit(onSubmitApprover)}
          >
            {/* { isLoading ? (
            <CircularProgress size={24} color="inherit" />
            ) : (
            "Submit"
            )} */}
            Create Approver
          </LoadingButton> 
        </DialogActions>
      </Dialog>
    </>
  );
}
