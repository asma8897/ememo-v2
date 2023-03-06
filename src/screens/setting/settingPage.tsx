import {
    Box, 
    Button, 
    styled, 
    Tab, 
    Tabs,
} from '@mui/material';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { primaryColor } from '../../constants/styles';
import { CompanyPage } from './company/companyPage';
import { DepartmentPage } from './department/departmentPage';
import { MemoTypePage } from './memoType/memoTypePage';
import { ProjectPage } from './project/projectPage';
import { GroupPage } from './group/groupPage';
import { UserPage } from './user/userPage';

const NewDiv = styled("div") ({
  fontWeight: "bold",
  fontSize: "24px",
  marginRight: "16px",
});

const NewButton = styled(Button) ({
  backgroundColor: "#F16E5F",
  fontWeight: "bold",
  color: "white",
  "&:hover": {
    backgroundColor: primaryColor,
  },
})

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function SettingPage() {
  
  let { setting } = useParams();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: "flex" }}>
          <NewDiv>Setting</NewDiv>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Company" {...a11yProps(0)} />
          <Tab label="Department" {...a11yProps(1)} />
          <Tab label="Memo Type" {...a11yProps(2)} />
          <Tab label="Project" {...a11yProps(3)} />
          <Tab label="Group" {...a11yProps(4)} />
          <Tab label="User" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CompanyPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DepartmentPage />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MemoTypePage />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProjectPage />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <GroupPage />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <UserPage />
      </TabPanel>
  </Box>
      
  );
}

export default SettingPage;