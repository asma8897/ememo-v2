import { Box } from "@mui/material";

export function AppSubtitle({ title } : { title: string}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>{title}</Box>
    </Box>
  );
}
