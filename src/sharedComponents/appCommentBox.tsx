import { Box, Avatar } from "@mui/material";
import { format } from "date-fns";
import {
  borderRadius,
  lightBorderGrey,
  primaryColor,
  primaryLightColor,
} from "../constants/styles";
import { Comment } from "../model/comment.model";

export function AppCommentBox({
  comment,
  refCallback = null,
}: AppCommentBoxProp) {
  const createdByUserId = comment.createdByUserId;
  return (
    <div ref={refCallback}>
      <Box
        sx={{
          padding: "16px 0",
          borderBottom: `1px solid ${lightBorderGrey}`,
          borderRadius: borderRadius,
          marginBottom: "8px",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="start"
      >
        <Box display="flex">
          <Avatar sx={{ backgroundColor: primaryColor, marginRight: "16px" }}>
            {createdByUserId}
          </Avatar>
          <Box display="flex" flexDirection="column">
            <Box sx={{ fontWeight: "bold", fontSize: "16px" }}>
              {comment.createdByUserId}
            </Box>
            <Box sx={{ fontSize: "14px" }}></Box>
            <Box sx={{ fontSize: "14px" }}>
              {/* {format(comment.createdAt.toDate(), "hh:mm a, dd MMM yy")} */}
            </Box>
          </Box>
          <Box sx={{ marginTop: "16px", marginLeft: "55px" }}>
            {comment.comments}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

interface AppCommentBoxProp {
  comment: Comment;
  refCallback?: any;
}
