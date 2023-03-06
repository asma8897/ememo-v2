import React, { useEffect, useState } from "react";
import {
  borderRadius,
  lightBorderGrey,
  primaryColor,
  primaryLightColor,
} from "../constants/styles";
import { Control, Controller, useForm } from "react-hook-form";
import { AddApproverDialog } from "../screens/ememo/submission/createMemoDialog/components/addApproverDialog";
import { RootState, useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { 
  Avatar, 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl, 
  MenuItem, 
  Select 
} from "@mui/material";
import { 
  addSelectedApprovalList, 
  setApproverDialog, 
  setEmptyApprovalError 
} from "../features/slices/memoApprovalListSlice";
import { ApprovalItem } from "../screens/ememo/submission/createMemoDialog/components/approvalItem";
import { Group } from "../model/group.model";
import { LoadingButton } from "@mui/lab";
import { useGetAllGroupQuery } from "../features/api/groupApi";

export function AppApprovalEdit({
  control,
  name,
  // label,
  defaultValue,
  // children,
  approverList,
  displayOnly = false,
}: AppApprovalEditProps) {

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupId: "",
    },
  });

  const approvalSelectedList = useSelector(
    (state: RootState) => state.memoApprovalSlice.selectedApprovalList
  );

  const { data: approverGroup } = useGetAllGroupQuery();

  const [activeApprover, setActiveApprover] = useState<Group | null>(null);
  
  const selectedCCPersonId = useSelector((state: RootState) => 
    state.createMemoLoopDialog.selectedMemoLoopUsers.map((cc) => cc.id)
  )

  const dialogOpen = useSelector(
    (state: RootState) => state.memoApprovalSlice.approverDialogStatus
  );

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
      {/* <AddApproverDialog /> */}
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
              name={name}
              control={control}
              defaultValue={defaultValue}
              render={({ field: { onChange, value } }) => (
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
      {approvalSelectedList?.map((approver) => {
        return (
          <div key={approver.groupId}>
            <ApprovalItem approvalData={approver} displayOnly={displayOnly} />
          </div>
        )
      })}
      {displayOnly ? null : (
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
          color="primary"
          onClick={() => dispatch(setApproverDialog(true))}
        >
          Add Approver
        </Button>
      )}
    </>
  );
}

interface AppApprovalEditProps {
  control: Control<any>;
  name: string;
  // label: string;
  defaultValue: any;
  // children?: React.ReactNode;
  approverList: Group[];
  displayOnly?: boolean;
}
