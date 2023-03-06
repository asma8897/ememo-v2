import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  styled,
  TextField,
  OutlinedInput,
  SelectChangeEvent,
  Chip,
  CircularProgress,
  DialogContent,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  borderRadius,
  lightBorderGrey,
  primaryColor,
} from "../../../../constants/styles";
import { useGetAllCompanyQuery } from "../../../../features/api/companyApi";
import { useGetAllDepartmentQuery } from "../../../../features/api/departmentApi";
import { useGetAllMemoTypeQuery } from "../../../../features/api/memoTypeApi";
import { useGetAllProjectQuery } from "../../../../features/api/projectApi";
import { Theme, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppApprovalEdit } from "../../../../sharedComponents/appApprovalEdit";
import { AddMemoLoop } from "./components/add-memo-loop.component";
import { RootState, useAppDispatch } from "../../../../app/store";
import { AppAttachment } from "../components/appAttachment";
import { AppEditorField } from "../../../../sharedComponents/appEditorField";
import {
  useAddNewEmemoMutation,
  useGetAllEmemoQuery,
} from "../../../../features/api/eMemoApi";
import LoadingButton from "@mui/lab/LoadingButton";
import { AppSizedBox } from "../../../../sharedComponents/appSizedBox";
import { AppCreateMemoTitle } from "../../../../sharedComponents/appCreateMemoTitle";
import { MemoFormField } from "./components/memoFormField";
import { AppErrorMsg } from "../../../../sharedComponents/appErrorMsg";
import { MemoFormDropDownField } from "./components/memoFormDropDownField";
import { auth } from "../../../../firebase";
import { useGetAllUserQuery } from "../../../../features/api/userApi";
import { useGetAllGroupQuery } from "../../../../features/api/groupApi";
import { addSelectedApprovalList, setEmptyApprovalError, setApproverDialog } from "../../../../features/slices/memoApprovalListSlice";
import { Group } from "../../../../model/group.model";
import { ApprovalItem } from "./components/approvalItem";

const DivTitle = styled("div")({
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "28px",
  width: "100%",
  color: primaryColor,
});

const DivContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ContentInnerContainer = styled("div")({
  // maxWidth: "80%",
  // width: "60%",
  width: "100%",
});

const CreateMemoTitle = styled("div")({
  display: "flex",
  justifyContent: "center",
  color: "#504E4E",
  fontWeight: "bold",
  fontSize: "18px",
  margin: "24px 0",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, projName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      projName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function CreateMemoDialog() {
  const { data: department, isLoading: isLoadingDepartment } = useGetAllDepartmentQuery();
  const { data: company, isLoading: isLoadingCompany } = useGetAllCompanyQuery();
  const { data: memotype, isLoading: isLoadingMemoType } = useGetAllMemoTypeQuery();
  const { data: project, isLoading: isLoadingProject } = useGetAllProjectQuery();
  const { data: users, isLoading: isLodingUser } = useGetAllUserQuery();
  const { data: Ememo, isLoading: isLoadingEmemo } = useGetAllEmemoQuery();
  const [addNewEmemo] = useAddNewEmemoMutation();
  const [loading, setLoading] = useState(false);

  const groupApprovalList = useSelector(
    (state: RootState) => state.memoApprovalSlice.approvalList
  );

  const activeEditMemo = useSelector(
    (state: RootState) => state.ememo.activeEditEMemo
  );

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      addressTo: "",
      from: "",
      departmentId: "",
      companyId: "",
      projectId: "",
      memoTypeId: "",
      createdOn: "",
      updatedOn: "",
      submittedOn: "",
      userId: "",
      memoStatusId: "1",
      subject: "",
      content: "",
      executiveChairman: "",
      groupId: "",
    },
  });

  const createNewEmemo = async (data: any) => {
    const user = auth.currentUser;
    const getUserId = users?.find((us) => user?.uid === us.uid)
  
    let payload = {
      addressTo: data.addressTo,
      from: data.from,
      departmentId: data.departmentId,
      companyId: data.companyId,
      projectId: data.projectId,
      memoTypeId: data.memoTypeId,
      createdOn: data.createdOn,
      updatedOn: data.updatedOn,
      submittedOn: data.submittedOn,
      userId: getUserId?.id,
      memoStatusId: data.memoStatusId,
      subject: data.subject,
      content: data.content,
      executiveChairman: data.executiveChairman,
      groupId: data.groupId,
      // attachmentId: data.attachmentId,
      // ccUserId: data.ccUserId,
    };
    addNewEmemo(payload);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    reset({
      addressTo: "",
      from: "",
      departmentId: "",
      companyId: "",
      projectId: "",
      memoTypeId: "",
      createdOn: "",
      updatedOn: "",
      submittedOn: "",
      userId: "",
      memoStatusId: "",
      subject: "",
      content: "",
      executiveChairman: "",
      groupId: "",
    });
  };

  const theme = useTheme();
  const [projSelected, setProjSelected] = useState<any>([]);
  const [groupSelected, setGroupSelected] = useState<any>([]);
  const { data: projects} = useGetAllProjectQuery();
  const { data: approverGroup } = useGetAllGroupQuery();


  const dispatch = useAppDispatch();

  // const handleChange = (event: SelectChangeEvent<typeof projName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setProjName(typeof value === "string" ? value.split(",") : value);
  // };

  const approvalSelectedList = useSelector(
    (state: RootState) => state.memoApprovalSlice.selectedApprovalList
  );

  const [activeApprover, setActiveApprover] = useState<Group | null>(null);
  // console.log(activeApprover)
  
  const selectedCCPersonId = useSelector((state: RootState) => 
    state.createMemoLoopDialog.selectedMemoLoopUsers.map((cc) => cc.id)
  )

  const dialogOpen = useSelector(
    (state: RootState) => state.memoApprovalSlice.approverDialogStatus
  );

  const onSelectedApprover = (event: any) => {
    var selectedApprovedId = event.target.value;
    var selectedApprover = approverGroup?.find((approver) => approver.id === selectedApprovedId)
    if (selectedApprover) {
      console.log(selectedApprover)
      setActiveApprover(selectedApprover);
    }
  };

  function onSubmitApprover(data: any) {
    if (activeApprover) {
      dispatch(
        addSelectedApprovalList({
          groupData: activeApprover
        })
      );
      setActiveApprover(null);
    } else {
      dispatch(setEmptyApprovalError(true));
    }
  }
  
  return (
    <>
      <Box
        sx={{
          position: "relative",
          padding: "24px",
          height: "100%",
          width: "100%",
        }}
      >
        <form>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "28px",
                width: "100%",
                color: primaryColor,
              }}
            >
              Create New E-Memo
            </Box>
            <AppSizedBox width="16px" />
            <LoadingButton
              sx={{
                backgroundColor: "#F16E5F",
                fontWeight: "bold",
                color: "white",
                "&:hover": {
                  backgroundColor: primaryColor,
                },
                variant: "contained",
              }}
              color="primary"
              loading={loading}
              size="large"
              onClick={handleSubmit(createNewEmemo)}
            >
              {isLoadingEmemo ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </LoadingButton>
          </Box>
          <br />
          <DivContentContainer></DivContentContainer>
          <Divider variant="middle" />
          <ContentInnerContainer>
            <AppCreateMemoTitle text="Memo Details" />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MemoFormField
                  control={control}
                  name="addressTo"
                  label="Address To *"
                  defaultValue=""
                />
                <AppSizedBox width="48px" />
                <MemoFormField
                  control={control}
                  name="from"
                  label="From *"
                  defaultValue=""
                />
              </Box>
              <br />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MemoFormDropDownField
                  control={control}
                  label="Departments"
                  defaultValue=""
                  name="departmentId"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {department?.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      {`${dept.name}`}
                    </MenuItem>
                  ))}
                </MemoFormDropDownField>
                <AppSizedBox width="48px" />
                <MemoFormDropDownField
                  control={control}
                  label="Company"
                  defaultValue=""
                  name="companyId"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {company?.map((comp) => (
                    <MenuItem key={comp.id} value={comp.id}>
                      {`${comp.name}`}
                    </MenuItem>
                  ))}
                </MemoFormDropDownField>
              </Box>
            </Box>
            <br />
            <MemoFormDropDownField
              control={control}
              label="Memo Type *"
              defaultValue=""
              name="memoTypeId"
            >
              {isLoadingMemoType ? (
                <MenuItem value="">
                  <em>Loading...</em>
                </MenuItem>
              ) : memotype?.length !== 0 ? (
                memotype
                  ?.slice()
                  .sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                  )
                  .map((memo) => (
                    <MenuItem key={memo.id} value={memo.id}>
                      {memo.name}
                    </MenuItem>
                  ))
              ) : (
                <MenuItem value="">
                  <em>No MemoType available</em>
                </MenuItem>
              )}
             
            </MemoFormDropDownField>
            <br />
            <br />
            <label>Projects</label>
            <Controller
              name="projectId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                  variant="outlined"
                >
                  <Select
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: "10px",
                        width: "100%",
                      },
                    }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "center",
                      },
                      keepMounted: true,
                      PaperProps: { style: { maxHeight: "300px" } },
                    }}
                    multiple
                    value={projSelected}
                    // onChange={handleChange}
                    onChange={(event) => {
                      setProjSelected(event.target.value);
                      onChange(event);
                    }}
                    input={<OutlinedInput label="Projects" />}
                    renderValue={(data) => (
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                      >
                        {projSelected.map((value: any) => (
                          <Chip
                          key={value}
                          label={
                            projects?.find((prj) => prj.id === value)?.name
                          }
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                          onDelete={() => {
                            setProjSelected((projSelected: any) => [
                              ...projSelected.filter(
                                (projId: any) => projId !== value
                              ),
                            ]);
                            onChange([
                              ...projSelected.filter(
                                (projId: any) => projId !== value
                              ),
                            ]);
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {project?.map((proj) => (
                      <MenuItem
                        key={proj.id}
                        value={proj.id}
                      >
                        {proj.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <br />
            <br />
            <AppCreateMemoTitle text="Subject and Content" />
            <MemoFormField
              control={control}
              name="subject"
              label="Subject *"
              defaultValue=""
            />
            <AppSizedBox height="16px" />
            <br />
            <br />
            {/* <AppEditorField /> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                width: "100%",
              }}
            >
              <AppAttachment />
            </Box>
            <CreateMemoTitle>Approval Flow *</CreateMemoTitle>
            {/* <AppApprovalEdit 
              approverList={groupApprovalList}
              control={control}
              name="groupId"
              defaultValue=""
            /> */}
            <Dialog 
              open={dialogOpen} 
              maxWidth="xl" 
              onClose={() => dispatch(setApproverDialog(false))}
            >
              <DialogContent>
                <DialogTitle>Select your approver</DialogTitle>
                <FormControl
                  sx={{
                    marginBottom: "16px",
                    width: "400px",
                    flex: 1,
                    borderRadius: borderRadius,
                  }}
                  variant="outlined"
                >
                  <Controller
                    name="groupId"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value} }) => (
                      <Select
                        sx={{ border: "none" }}
                        variant="outlined"
                        value={groupSelected}
                        
                        onChange={(event) => {
                          onSelectedApprover(event);
                          onChange(event);
                        }}
                      >
                        {approverGroup?.map((approver) => (
                          <MenuItem key={approver.id} value={approver.id}>
                            <Box display="flex" alignItems="center">
                              <Avatar 
                                sx={{ 
                                  backgroundColor: primaryColor,
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "8px",
                                }}
                              >
                                {approver.id}
                                {/* {`${console.log(approver.id)}`} */}
                                {/* .name.substring(0, 2).toUpperCase() */}
                              </Avatar>
                              <Box display="flex" flexDirection="column">
                                <Box sx={{ fontWeight: "bold" }}>{approver.name}</Box>
                                {/* {userSelected?.map((us: any) => (
                                  <p key={us.id}>{us.name}</p>
                                ))} */}
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{
                    backgroundColor: "#F16E5F",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": {
                      backgroundColor: primaryColor,
                    },
                    variant: "outlined",
                  }}
                  color="primary"
                  onClick={() => dispatch(setApproverDialog(false))}
                >
                  Cancel
                </Button>
                <LoadingButton
                  sx={{
                    backgroundColor: "#F16E5F",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": {
                      backgroundColor: primaryColor,
                    },
                    variant: "contained",
                  }}
                  color="primary"
                  onClick={handleSubmit(onSubmitApprover)}
                >
                  {/* { isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                  ) : (
                  "Submit"
                  )} */}
                  Create Approver
                </LoadingButton> 
              </DialogActions>
            </Dialog>
            {approvalSelectedList?.map((groupAppr) => {
              return (
                <div key={groupAppr.groupId}>
                  <ApprovalItem approvalData={groupAppr} />
                </div>
              )
            })}
            {/* {displayOnly ? null : ( */}
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
                color="primary"
                onClick={() => dispatch(setApproverDialog(true))}
              >
                Add Approver
              </Button>
            {/* )} */}
            <CreateMemoTitle>Memo Loop</CreateMemoTitle>
          </ContentInnerContainer>
          <AddMemoLoop />
        </form>
      </Box>
    </>
  );
}
export default CreateMemoDialog;
