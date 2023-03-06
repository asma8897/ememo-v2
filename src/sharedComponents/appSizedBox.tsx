import { Box, styled } from "@mui/material";

// interface SizedBoxProp {
//     height? : string;
//     width?: string;
// }

export function AppSizedBox({ height = "0", width = "0" }) {
    return (
        <Box sx={{ height: `${height}`, width: `${width}`}}></Box>
    )
}