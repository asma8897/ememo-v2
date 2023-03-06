import { 
  Avatar, 
  Box, 
  Button, 
  IconButton 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  borderRadius,
  lightBorderGrey,
  primaryColor,
  primaryLightColor,
} from "../../../../../constants/styles";
import { RootState, useAppDispatch } from "../../../../../app/store";
import { AddMemoLoopCreateDialog } from "./add-memo-loop-create-dialog.component";
import { useSelector } from "react-redux";
import { openCreateMemoLoopDialog, removeMemoLoopUser } from "../../../../../features/slices/create-memo-loop.slice";
import { useState } from "react";
import { User } from "../../../../../model/user.model";

export function AddMemoLoop() {
  const dispatch = useAppDispatch();
  const selectedMemoLoop = useSelector(
    (state: RootState) => state.createMemoLoopDialog.selectedMemoLoopUsers
  );

  const onDeleteMemoCC = (person: User) => {
    dispatch(removeMemoLoopUser(person));
  }

  return (
    <Box
      sx={{ margin: "24px 0" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="60%"
    >
      <AddMemoLoopCreateDialog />
      {selectedMemoLoop?.map((ccPerson) => {
        return (
          <Box
            sx={{
              padding: "16px",
              border: `1px solid ${lightBorderGrey}`,
              borderRadius: borderRadius,
              margin: "4px 0",
              width: "100%",
            }}
            display="flex"
            alignItems="center"
            key={ccPerson.id}
          >
            <Box sx={{ flex: "1" }} display="flex" alignItems="center">
              <Avatar
                sx={{
                  backgroundColor: primaryColor,
                  width: "50px",
                  height: "50px",
                  marginRight: "8px",
                }}
              >
                {ccPerson.name.substring(0, 2).toUpperCase()}
              </Avatar>
              <Box display="flex" flexDirection="column">
                <Box sx={{ fontWeight: "bold" }}>{ccPerson.name}</Box>
                <div>{ccPerson.jobTitle}</div>
              </Box>
            </Box>
            <IconButton
              onClick={() => onDeleteMemoCC(ccPerson)}
              sx={{
                marginRight: "16px",
                color: primaryLightColor,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      })}
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "100%"
        }}
      >
        <Button
          sx={{
            backgroundColor: "#F16E5F",
            fontWeight: "bold",
            color: "white",
            width: "150px",
            "&:hover": {
              backgroundColor: primaryColor,
            },
            variant: "contained",
          }}
          color="primary"
          onClick={() => {
            dispatch(openCreateMemoLoopDialog())
          }}
        >
          Add Memo Loop
        </Button>
      </Box>
    </Box>
  );
}
