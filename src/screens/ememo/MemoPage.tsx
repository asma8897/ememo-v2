import {
  Box, 
  Button, 
  styled, 
  Tab, 
  Tabs,
} from '@mui/material';
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { primaryColor } from '../../constants/styles';
import AddIcon from "@mui/icons-material/Add";
import { PendingMemoPage} from "./pendingMemo/pendingMemoPage";
import { SubmissionPage } from "./submission/SubmissionPage";
import { DraftsPage } from "./drafs/draftPage";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase";
import { login, logout } from '../../features/slices/userSlice';
import { useAppDispatch } from "../../app/store";

const NewDiv = styled("div") ({
  fontWeight: "bold",
  fontSize: "24px",
  marginRight: "16px",
});

const DivTitle = styled("div")({
  color: "white",
  fontWeight: "bold",
});
    
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MemoPage() {

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const navigate = useNavigate();
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       navigate("");
  //       console.log("uid", uid);
  //     } else {
  //       navigate("/login");
  //       console.log("User not logged in yet!");
  //     }
  //   });
  // }, [])
  //   const dispatch = useAppDispatch();
  //   useEffect(() => {
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
  //       // console.log("Please login");
  //     }
  //   });
  // }, []);

  return (
    <>
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <NewDiv>E-Memo Management</NewDiv>
        <Button
          sx={{
            backgroundColor: "#F16E5F",
            fontWeight: "bold",
            color: "white",
            "&:hover": {
              backgroundColor: primaryColor,
            },
            variant: "contained",
          }}
          href="/home/creatememo"
        >
          <Box sx={{ display: "flex" }}>
            <AddIcon
              sx={{
                marginRight: "16px",
                color: "white",
              }}
            />
            <DivTitle>ADD NEW E-MEMO</DivTitle>
          </Box>
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pending Memo" {...a11yProps(0)} />
          <Tab label="List of Memos" {...a11yProps(1)} />
          <Tab label="Drafts" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PendingMemoPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubmissionPage />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DraftsPage />
      </TabPanel>
    </Box>
    <Outlet />
    </>
  );
}

export default MemoPage;
