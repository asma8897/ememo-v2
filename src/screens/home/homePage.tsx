import {
  borderRadius,
  primaryColor,
  unselectedGrey,
} from "../../constants/styles";
import {
  styled,
  Button,
  Drawer,
  Box,
  CssBaseline,
  Typography,
  ListItem,
} from "@mui/material";
import logo from "../../assets/sunsuria-logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import { ExitToApp } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const IconNoti = styled(NotificationsIcon)({
  marginRight: "16px",
});

const Logo = styled("img")({
  marginBottom: "4px",
  width: "100%",
});


const NewButton = styled(Button)({
  backgroundColor: "#F16E5F",
  fontWeight: "bold",
  color: "white",
  "&:hover": {
    backgroundColor: primaryColor,
  },
});


export default function HomePage() {
  const navList = [
    {
      name: "E-Memo",
      icon: <IconNoti></IconNoti>,
      link: "/home/ememo",
      isSelected: false,
      idx: 0,
    },
    {
      name: "Setting",
      icon: <IconNoti></IconNoti>,
      link: "/home/setting",
      isSelected: false,
      idx: 1,
    },
  ];

  const drawerWidth = 225;

  
  
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (userAuth) => {
  //     if (userAuth) {
  //       dispatch(
  //         login({
  //           email: userAuth.email,
  //           uid: userAuth.uid,
  //           displayName: userAuth.displayName,
  //           photoUrl: userAuth.photoURL,
  //         })
  //       );
  //     } else {
  //       dispatch(logout());
  //       console.log("user is logged out");
  //     }
  //   });
  // }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login", { replace: true });
      console.log("Signed out successfully")
    }).catch((error) => {
      alert(error);
    })
  }

  return (
    // <>
    // {!user ? (
    //   <LoginPage />
    // ) : (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#F9FAFE",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: "225px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "225px",
            boxSizing: "border-box",
            backgroundColor: "white",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            padding: "32px",
            border: "none",
            boxShadow: "0 8px 24px #DCDDDF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        variant="permanent"
        open
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo src={logo} alt="logo"></Logo>
          <Box
            sx={{
              color: primaryColor,
              marginBottom: "24px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Version 2
          </Box>
          {/* <Divider /> */}
          <List>
            {navList.map((text, index) => (
              <ListItem key={text.link} disablePadding>
                <ListItemButton>
                  <NewButton
                    variant="contained"
                    color="primary"
                    href={text.link}
                  >
                    {text.name}
                  </NewButton>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            padding: "8px 16px",
            width: "100%",
            textDecoration: "none",
            transition: "200ms ease-in-out",
            borderRadius: borderRadius,
            color: unselectedGrey
          }}
          size="large"
          onClick={handleLogout}
        >
          <ExitToApp sx={{ marginRight: "16px" }} />
          <div style={{ color: "#504E4E", opacity: 0.5}}>Logout</div>
        </Button>
      </Drawer>
     
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          position: "relative",
          padding: "24px",
          height: "100%",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
    // )}
    // </>
  );
}

// <NewDiv>
//     <Box sx={{borderRadius: "10px"}}></Box>
//     <RedDiv></RedDiv>
//     <NewDrawer
//         variant="permanent"
//         open
//     >
//         <Box display="flex" flexDirection="column" alignItems="center">
//             <Logo src={logo} alt="logo"></Logo>
//             <VersionNumbering>Version 2</VersionNumbering>
//             {navList.map((nav) => (
//                 <NewButton
//                     size="large"
//                     onClick={(e) => handleNavigation(e, nav.idx)}
//                     key={nav.name}
//                     value={nav.link}
//                     style={{ textDecoration: "none" }}
//                     >
//                     <IconBtn></IconBtn>
//                     {nav.name}
//                 </NewButton>
//             ))}
//         </Box>
//     </NewDrawer>
// </NewDiv>
