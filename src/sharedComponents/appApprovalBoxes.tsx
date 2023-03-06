import { Box } from "@mui/material";
import { useEffect } from "react";
import { borderRadius, lightBorderGrey } from "../constants/styles";
import { MemoApproval } from "../model/memo-approval.model";
import { format } from "date-fns";

export function AppApprovalBoxes({ approvalLogic }: ApprovalBoxesProps) {
  if (approvalLogic) {
    return (
      <Box display="flex" flexWrap="wrap">
        {approvalLogic?.map((approver) => (
          <Box key={approver.id} display="flex" flexDirection="column">
            <Box
              sx={{
                padding: "16px",
                borderRadius: borderRadius,
                border: `1px solid ${lightBorderGrey}`,
                marginRight: "8px",
                marginBottom: "8px",
                width: "200px",
              }}
              key={approver.id}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Approval {approver.order}
              </Box>
              <Box
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {approver.groupId}
              </Box>
              {format(new Date(approver.createdOn), "dd MMM yyyy, hh:mm a")}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}

interface ApprovalBoxesProps {
  approvalLogic: MemoApproval[];
}
