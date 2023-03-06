import { Box, Avatar, CircularProgress, styled } from "@mui/material";
import {
  ArrowBackIos,
  Create,
  Edit,
  PictureAsPdf,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import {
  borderRadius,
  lightBorderGrey,
  primaryColor,
} from "../../../constants/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";
import { format } from "date-fns";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { AppSubtitle } from "../../../../src/sharedComponents/appSubtitle";
import { AppSizedBox } from "../../../../src/sharedComponents/appSizedBox";
import { AppApprovalBoxes } from "../../../sharedComponents/appApprovalBoxes";
import { AppCommentSection } from "../../../sharedComponents/appCommentSection";
import Button from "@mui/material/Button";
import { setMemoLoopDialog } from "../../../features/slices/memoLoopSlice";
import { useGetOneEmemoQuery } from "../../../features/api/eMemoApi";
import { useState } from "react";

const MemoDescContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  marginBottom: "8px",
});

const MemoDesc = styled(Box)({
  fontFamily: "Fira Sans",
  width: "30%",
});

const SemiColonDivider = styled("div")({
  marginLeft: "16px",
  marginRight: "16px",
  fontFamily: "Fira Sans",
  fontWeight: "bold",
});

const MemoNormalTxt = styled("div")({
  fontFamily: "Fira Sans",
  flexGrow: 2,
  textAlign: "left",
});

// const AppSizedBox = styled("div") ({
//   height :"16px"
// });

export function EmemoDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { data: memoDetail, isLoading } = useGetOneEmemoQuery(id);

  function openNewTab(url: string) {
    window.open(url, "_blank");
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={40} thickness={5} />
        <Box
          sx={{
            color: primaryColor,
            fontWeight: "bold",
            fontSize: "20px",
            marginTop: "16px",
          }}
        >
          E-Memo is loading
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "start",
        padding: "32px",
        width: "100%",
        backgroundColor: "#F9FAFE",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <ArrowBackIos
          sx={{
            cursor: "pointer",
            marginRight: "24px",
          }}
          onClick={() => navigate(-1)}
        />
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            marginRight: "16px",
          }}
        >
          Memo Content
        </Box>
      </Box>
      <Box display="flex" alignItems="start">
        <Box sx={{ marginRight: "16px" }} flex={2}>
          <Box
            sx={{
              padding: "24px",
              backgroundColor: "white",
              boxShadow: "0 8px 24px #EAEBEF",
              border: "none",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{ fontWeight: "bold", fontSize: "22px", color: primaryColor }}
            >
              {memoDetail.company.name}
            </Box>
            <Box
              sx={{
                fontSize: "18px",
                marginBottom: "8px",
                marginTop: "8px",
                fontWeight: "bold",
              }}
            >
              Subject: {memoDetail.subject}
            </Box>
            <MemoDescContainer>
              <MemoDesc>Submitted By</MemoDesc>
              <SemiColonDivider>:</SemiColonDivider>
              <MemoNormalTxt>{memoDetail.createdBy.name}</MemoNormalTxt>
            </MemoDescContainer>
            <MemoDescContainer>
              <MemoDesc>Submitted On</MemoDesc>
              <SemiColonDivider>:</SemiColonDivider>
              <MemoNormalTxt>
                {memoDetail?.submittedOn 
                  ? format(new Date(memoDetail.submittedOn), "d MMM, yyyy")
                  : "Error"}
              </MemoNormalTxt>
            </MemoDescContainer>
            <MemoDescContainer>
              <MemoDesc>To</MemoDesc>
              <SemiColonDivider>:</SemiColonDivider>
              <MemoNormalTxt>{memoDetail.addressTo}</MemoNormalTxt>
            </MemoDescContainer>
            <MemoDescContainer>
              <MemoDesc>From</MemoDesc>
              <SemiColonDivider>:</SemiColonDivider>
              <MemoNormalTxt>{memoDetail.from}</MemoNormalTxt>
            </MemoDescContainer>
            <MemoDescContainer>
              <MemoDesc>Department</MemoDesc>
              <SemiColonDivider>:</SemiColonDivider>
              <MemoNormalTxt>{memoDetail.department.name}</MemoNormalTxt>
            </MemoDescContainer>
            <MemoDescContainer>
              <MemoDesc>Memo Type</MemoDesc>
              <SemiColonDivider>:</SemiColonDivider>
              <MemoNormalTxt>{memoDetail.memoType.name}</MemoNormalTxt>
            </MemoDescContainer>
            <MemoDescContainer>
              <MemoDesc>Project</MemoDesc>
              <SemiColonDivider>:</SemiColonDivider>
              <MemoNormalTxt>
                {memoDetail.projects.map((prj: any) => prj.name).join(", ")}
              </MemoNormalTxt>
            </MemoDescContainer>
            <AppSizedBox height="16px" />
            <AppSubtitle title="Content" />
            <MemoNormalTxt>{memoDetail.content}</MemoNormalTxt>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {/* {memoDetail?.attachmentData.map((attach) => (
                <Box 
                  sx={{
                    padding: "16px",
                    borderRadius: borderRadius,
                    marginBottom: "8px",
                    marginRight: "8px",
                    cursor: "pointer",
                    backgroundColor: lightBorderGrey,
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={() => {
                    openNewTab(attach.url);
                  }}
                >
                  <AttachmentIcon sx={{ marginRight: "16px" }} />
                  {attach.fileName}
                </Box>
              ))} */}
            </Box>
            <AppSubtitle title="Approvals" />
            <AppSizedBox height="24px" />
            {/* <AppApprovalBoxes
              approvalLogic={memoDetail?.approvalLogic}
            /> */}
            <AppSizedBox height="24px" />
            <AppSubtitle title="Activity Log" />
            <AppSizedBox height="24px" />
            {/* <AppCommentSection memoId={} /> */}
          </Box>
          <Box flex={1}>
            <Box
              sx={{
                padding: "24px",
                backgroundColor: "white",
                boxShadow: "0 8px 24px #EAEBEF",
                border: "none",
                borderRadius: "10px",
              }}
            >
              <Box display="flex" flexDirection="column">
                <AppSubtitle title="Memo Status" />
                <AppSizedBox height="18px" />
                <Box
                  sx={{
                    border: `1px solid ${lightBorderGrey}`,
                    borderRadius: borderRadius,
                    marginBottom: "16px",
                    padding: "16px",
                  }}
                >
                  {/* {<DayCount memoData={memoDetail} isTableCell={false} />} */}
                </Box>
                <AppSubtitle title="Memo Loop" />
                <Box
                  sx={{
                    borderRadius: borderRadius,
                    border: `1px solid ${lightBorderGrey}`,
                    marginBottom: "16px",
                  }}
                >
                  <Box
                    sx={{
                      margin: "0 16px",
                      width: "100%",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    CC to
                  </Box>
                </Box>
                <Button
                  sx={{
                    marginBottom: "8px",
                    borderRadius: borderRadius,
                    fontWeight: "bold",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: primaryColor,
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    dispatch(setMemoLoopDialog(true));
                  }}
                >
                  + Add New User To Loop
                </Button>
                <AppSubtitle title="Actions" />
                <AppSizedBox height="18px" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
