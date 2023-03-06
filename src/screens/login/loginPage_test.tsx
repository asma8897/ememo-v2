import { Box, Button } from "@mui/material";
import logo from "../../assets/sunsuria-logo.png";
// import {
//   auth,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signInWithEmailAndPassword,
// } from "../../firebase";
import { useAppDispatch } from "../../app/store";
import { login } from "../../features/slices/userSlice";

function LoginPageTest() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F9FAFE",
        }}
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="content"
        alignItems="center"
        flexDirection="column"
      >
        <Box width="25%" display="flex" flexDirection="column">
          <img style={{ marginBottom: "24px" }} src={logo} />
          <Button
            sx={{
              height: "40px",
              width: "100%",
              marginTop: "24px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
            }}
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default LoginPageTest;