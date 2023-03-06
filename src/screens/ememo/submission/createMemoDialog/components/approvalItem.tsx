import { Avatar, Box } from "@mui/material";
import { useAppDispatch } from "../../../../../app/store";
import {
  borderRadius,
  lightBorderGrey,
  primaryColor,
  primaryLightColor,
} from "../../../../../constants/styles";
import { Group } from "../../../../../model/group.model";

export function ApprovalItem({
  approvalData,
  displayOnly = false,
}: ApprovalItemsProps) {
  return (
    <Box
      sx={{
        padding: "16px",
        border: `1px solid ${lightBorderGrey}`,
        borderRadius: borderRadius,
        marginBottom: "16px",
      }}
      display="flex"
      alignItems="center"
    >
      <Box sx={{ flex: 1 }} display="flex" alignItems="center">
        <Avatar
          sx={{
            backgroundColor: primaryColor,
            width: "50px",
            height: "50px",
            marginRight: "8px",
          }}
        >
          {approvalData.name}
        </Avatar>
        <Box display="flex" flexDirection="column">
          <Box sx={{ fontWeight: "bold" }}>{approvalData.id}</Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        {/* {displayOnly ? null : (
          <IconButton sx={{ marginRight: "16px", color: primaryLightColor }}
            onClick={() =>
              dispatch(removeSelectedApprovalList(approvalData?.id))
            }
          >
              <DeleteIcon /> 
          </IconButton>
        )} */}
      </Box>
    </Box>
  );
}

interface ApprovalItemsProps {
  // approvalData: Partial<MemoApproval>;
  approvalData: Partial<Group>;
  displayOnly?: boolean;
}
