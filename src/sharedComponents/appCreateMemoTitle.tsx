import { Box } from "@mui/material";

export function AppCreateMemoTitle({ text }: AppCreateMemoTitleProp) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        color: "#504E4E",
        fontWeight: "bold",
        fontSize: "18px",
        margin: "24px 0",
      }}
    >
      {text}
    </Box>
  );
}

interface AppCreateMemoTitleProp {
  text: string;
}
