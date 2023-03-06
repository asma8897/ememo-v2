import { Box, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import logo from "../../assets/sunsuria-logo.png";
import { auth } from "../../firebase";

function LoginPage() {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const onLogin = () => {
    // event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home/ememo");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userAuth) => {
    //     dispatch(
    //       login({
    //         email: userAuth.user.email,
    //         uid: userAuth.user.uid,
    //         displayName: userAuth.user.displayName,
    //         photoUrl: userAuth.user.photoURL,
    //       })
    //     );
    //     navigate("/home/ememo");
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F9FAFE",
        }}
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box width="25%" display="flex" flexDirection="column">
          <img src={logo} style={{ marginBottom: "24px" }} />
          <Box
            sx={{
              color: "#AAAAAA",
              marginBottom: "2px",
            }}
          >
            Email
          </Box>
          <Controller
            name="email"
            control={control}
            render={({ field: onChange }) => (
              <input
                style={{
                  marginBottom: "16px",
                  backgroundColor: "white",
                  boxShadow: "0 8px 24px #EAEBEF",
                  padding: "16px",
                  border: "none",
                  borderRadius: "10px",
                  outline: "none",
                }}
                onChange={(event) => setEmail(event.target.value)}
              />
            )}
          />
          <Box
            sx={{
              color: "#AAAAAA",
              marginBottom: "2px",
            }}
          >
            Password
          </Box>
          <Controller
            name="password"
            control={control}
            render={({ field: onChange }) => (
              <input
                style={{
                  marginBottom: "16px",
                  backgroundColor: "white",
                  boxShadow: "0 8px 24px #EAEBEF",
                  padding: "16px",
                  border: "none",
                  borderRadius: "10px",
                  outline: "none",
                }}
                onChange={(event) => setPassword(event.target.value)}
              />
            )}
          />
          <Button
            sx={{
              height: "40px",
              width: "100%",
              marginTop: "24px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={handleSubmit(onLogin)}
            color="primary"
            variant="contained"
          >
            LOGIN
            {/* {authLoading ? (
              <CircularProgress color="inherit" size={25} thickness={5} />
            ) : (
              "LOGIN"
            )} */}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
