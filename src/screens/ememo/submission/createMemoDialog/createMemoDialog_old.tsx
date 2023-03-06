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
  import { RootState } from "../../../../app/store";
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
  import { MemoProjectMultiSelect as MemoProjectMultiSelect} from "./components/projectMultiSelect";
  
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
  
  export function CreateMemoDialogOld() {
    const { data: department, isLoading: isLoadingDepartment } = useGetAllDepartmentQuery();
    const { data: company, isLoading: isLoadingCompany } = useGetAllCompanyQuery();
    const { data: memotype, isLoading: isLoadingMemoType } = useGetAllMemoTypeQuery();
    const { data: project, isLoading: isLoadingProject } = useGetAllProjectQuery();
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
        projectId: "1",
        memoTypeId: "",
        createdOn: "",
        updatedOn: "",
        submittedOn: "",
        userId: "1",
        memoStatusId: "1",
        subject: "",
        content: "",
        executiveChairman: "",
      },
    });
  
    const createNewEmemo = async (data: any) => {
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
        userId: data.userId,
        memoStatusId: data.memoStatusId,
        subject: data.subject,
        content: data.content,
        executiveChairman: data.executiveChairman,
        approvalId: data.approvalId,
        attachmentId: data.attachmentId,
        ccUserId: data.ccUserId,
      };
      addNewEmemo(payload);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      reset({});
    };
  
    const theme = useTheme();
    const [projName, setProjName] = useState<string[]>([]);
  
    const handleChange = (event: SelectChangeEvent<typeof projName>) => {
      const {
        target: { value },
      } = event;
      setProjName(typeof value === "string" ? value.split(",") : value);
    };
  
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
                  {/* <Box
                    sx={{
                      width: "100%",
                      "& .MuiBox-root": {
                        display: "flex",
                        flexDirection: "column",
                      },
                    }}
                  > */}
                    <MemoFormField
                      control={control}
                      name="addressTo"
                      label="Address To *"
                      defaultValue=""
                      // errorComponent={
                      //   <AppErrorMsg errorTxt={errors.}
                      // }
                    />
                    {/* <label>Address To *</label>
                    <Controller
                      name="addressTo"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          {...field}
                          sx={{
                            "& label.Mui-focused": {
                              display: "none",
                            },
                            [`& fieldset`]: {
                              borderRadius: "10px",
                              width: "100%",
                            },
                          }}
                          variant="outlined"
                          type="text"
                        />
                      )}
                    /> */}
                  {/* </Box> */}
                  <AppSizedBox width="48px" />
                  <MemoFormField
                    control={control}
                    name="from"
                    label="From *"
                    defaultValue=""
                  />
                  {/* <Box
                    sx={{
                      width: "100%",
                      "& .MuiBox-root": {
                        display: "flex",
                        flexDirection: "column",
                      },
                    }}
                  >
                    <label>From *</label>
                    <Controller
                      name="from"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          {...field}
                          sx={{
                            "& label.Mui-focused": {
                              display: "none",
                            },
                            [`& fieldset`]: {
                              borderRadius: "10px",
                              width: "100%",
                            },
                          }}
                          variant="outlined"
                          type="text"
                        />
                      )}
                    />
                  </Box> */}
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
                  {/* <Box
                    sx={{
                      width: "100%",
                      "& .MuiBox-root": {
                        display: "flex",
                        flexDirection: "column",
                      },
                    }}
                  >
                    <label>Departments *</label>
                    <Controller
                      name="departmentId"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          sx={{
                            width: "100%",
                          }}
                          variant="outlined"
                        >
                          <Select
                            {...field}
                            sx={{
                              [`& fieldset`]: {
                                borderRadius: "10px",
                                width: "100%",
                              },
                            }}
                            MenuProps={{
                              PaperProps: {
                                onScroll: (event: any) => {},
                              },
                              style: { maxHeight: 300 },
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {department?.map((dept: any, deptIdx: any) => (
                              <MenuItem key={deptIdx} value={dept.id}>
                                {`${dept.name}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Box> */}
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
                  {/* <Box
                    sx={{
                      width: "100%",
                      "& .MuiBox-root": {
                        display: "flex",
                        flexDirection: "column",
                      },
                    }}
                  >
                    <label>Company *</label>
                    <Controller
                      name="companyId"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          sx={{
                            width: "100%",
                          }}
                          variant="outlined"
                        >
                          <Select
                            {...field}
                            sx={{
                              [`& fieldset`]: {
                                borderRadius: "10px",
                                width: "100%",
                              },
                            }}
                            MenuProps={{
                              PaperProps: {
                                onScroll: (event: any) => {},
                              },
                              style: { maxHeight: 300 },
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {company?.map((comp, compIdx) => (
                              <MenuItem key={compIdx} value={comp.id}>
                                {`${comp.name}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Box> */}
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
                    .map((memo, idx) => (
                      <MenuItem key={idx} value={memo.id}>
                        {memo.name}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem value="">
                    <em>No MemoType available</em>
                  </MenuItem>
                )}
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {department?.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {`${dept.name}`}
                  </MenuItem>
                ))} */}
              </MemoFormDropDownField>
              {/* <label>Memo Type *</label>
              <Controller
                name="memoTypeId"
                control={control}
                render={({ field }) => (
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                    variant="outlined"
                  >
                    <Select
                      {...field}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "10px",
                          width: "100%",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          onScroll: (event: any) => {},
                        },
                        style: { maxHeight: 300 },
                      }}
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
                          .map((memo, idx) => (
                            <MenuItem key={idx} value={memo.id}>
                              {memo.name}
                            </MenuItem>
                          ))
                      ) : (
                        <MenuItem value="">
                          <em>No MemoType available</em>
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                )}
              /> */}
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
                      value={projName}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              onMouseDown={(event) => {
                                event.stopPropagation();
                              }}
                              onDelete={() => {
                                setProjName((projName) => [
                                  ...projName.filter(
                                    (projId) => projId !== value
                                  ),
                                ]);
                                onChange([
                                  ...projName.filter(
                                    (projId) => projId !== value
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
                      {project?.map((proj, projIdx) => (
                        <MenuItem
                          key={projIdx}
                          value={proj.name}
                          style={getStyles(proj.name, projName, theme)}
                        >
                          {`${proj.name}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <br />
              <br />
              {/* <CreateMemoTitle>Subject and Content</CreateMemoTitle> */}
              <AppCreateMemoTitle text="Subject and Content" />
              <MemoFormField
                control={control}
                name="subject"
                label="Subject *"
                defaultValue=""
              />
              <AppSizedBox height="16px" />
              {/* <label>Subject *</label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    sx={{
                      "& label.Mui-focused": {
                        display: "none",
                      },
                      [`& fieldset`]: {
                        borderRadius: "10px",
                        width: "100%",
                      },
                    }}
                    variant="outlined"
                    type="text"
                  />
                )}
              /> */}
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
              {/* <AppApprovalEdit approverList={groupApprovalList} /> */}
              <CreateMemoTitle>Memo Loop</CreateMemoTitle>
            </ContentInnerContainer>
            <AddMemoLoop />
          </form>
        </Box>
      </>
    );
  }
  export default CreateMemoDialogOld;
  