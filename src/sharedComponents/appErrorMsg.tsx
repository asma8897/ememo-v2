import { Box } from "@mui/material";
import { AppSizedBox } from "./appSizedBox";

export function AppErrorMsg({ errorTxt }: AppErrorMsgProp) {
  return (
    <>
      {errorTxt ? (
        <Box
          sx={{
            fontSize: "0.8rem",
            color: "#FF4D00",
            marginTop: "2px",
            fontWeight: "bold",
          }}
        >
          {errorTxt}
        </Box>
      ) : (
        <AppSizedBox height="20px" />
      )}
    </>
  );
}

interface AppErrorMsgProp {
    errorTxt: string;
}
