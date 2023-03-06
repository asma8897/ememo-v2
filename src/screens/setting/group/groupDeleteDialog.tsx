import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { primaryColor } from "../../../constants/styles";

export function GroupDeleteDialog(props: any) {
  
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
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
        <DialogContentText>Are you sure to delete item?</DialogContentText>
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
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface FormInputs {
  name: string;
}
