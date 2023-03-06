import { Send } from "@mui/icons-material";
import { Avatar, Box, IconButton } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { primaryColor } from "../constants/styles";
import { AppCommentBox } from "./appCommentBox";
import AppFormField from "./appFormField";
import { AppSizedBox } from "./appSizedBox";

export function AppCommentSection({ memoId }: AppCommentSectionProps) {
    const{ control, handleSubmit, reset } = useForm();
    
    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center">
                <Avatar sx={{ backgroundColor: primaryColor, marginRight: "8px" }}>
                    
                </Avatar>
                <AppFormField
                    control={control}
                    label="Comment"
                    keyName="comment"
                    isMultiLineText
                />
                <IconButton
                    sx={{
                        cursor: "pointer"
                    }}
                    color="primary"
                >
                    <Send />
                </IconButton>
            </Box>
            <AppSizedBox height="24px" />
            {/* <AppCommentBox
               
            /> */}
        </Box>
    )
}

interface AppCommentSectionProps {
    memoId: number;
}