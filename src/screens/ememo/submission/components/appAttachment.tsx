import { Box, Button, Fab, IconButton, Input } from "@mui/material";
import {
  borderRadius,
  lightBorderGrey,
  primaryColor,
} from "../../../../constants/styles";
import { Add, Delete } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { MemoAttachment } from "../../../../model/memo-attachment.model";
import { RootState, useAppDispatch } from "../../../../app/store";
import { useSelector } from "react-redux";
import { setAttachmentList } from "../../../../features/slices/memoAttachmentListSlice";

export function AppAttachment() {
  const [files, setFiles] = useState<File[]>([]);
  const [attachment, setAttachment] = useState<MemoAttachment[]>([]);
  const [inputKey, setInputKey] = useState(0);
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    // console.log('Here is triggered');
    inputRef.current?.click();
  };

  const onAddAttachment = ({
    currentTarget: {files},
  } : React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      setFiles(existing => existing.concat(Array.from(files)));
    }
    setInputKey(key => key + 1);
  };

  const onDeleteAttachment = (file: File) => {
    const updatedList = [...files];
    updatedList.splice(files.indexOf(file), 1);
    setFiles(updatedList);
  };

  // const onAttachment = (event: any) => {
  //   const target = event.target.files as HTMLInputElement;
  //   if (!target.files) return;

  //   const newFiles = Object.values(target.files).map((file: File) => file);
  //   if (newFiles) {
  //     const updatedList = [...files, ...newFiles];
  //     setFiles(updatedList)
  //   }
  // }


  // https://stackoverflow.com/questions/71471072/argument-of-type-file-is-not-assignable-to-parameter-of-type-setstateactions
  // https://levelup.gitconnected.com/how-to-implement-multiple-file-uploads-in-react-4cdcaadd0f6e
  // https://codefrontend.com/file-upload-reactjs/
  // https://codesandbox.io/s/pwq2vk7080?file=/FileUpload.js:901-917
  // https://www.commoninja.com/blog/handling-multiple-file-uploads-with-react-hook-form
  // https://www.techgeeknext.com/react/multiple-files-upload-example
  // https://codevoweb.com/react-rtk-query-react-hook-form-and-material-ui-multipart-formdata/
  // https://codesandbox.io/s/so-question-63501087-ds2fg?file=/src/App.tsx:188-196 (Jadi)
  // https://stackoverflow.com/questions/63501087/react-typescript-how-to-set-multiple-files-to-state
  // https://codevoweb.com/react-rtk-query-react-hook-form-and-material-ui-multipart-formdata/
  
  // const handleFileChange = (event: any) => {
  //   // if (event.target.files != null) {
  //   //   setFiles(event.target.files[0]);
  //   // }
  //   // console.log(inputRef.current?.files)
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        width: "100%",
      }}
    >
      <input 
        name="attachmentId"
        multiple 
        type="file" 
        hidden 
        ref={inputRef}
        key={inputKey}
        onChange={onAddAttachment}
      />
        {/* <Box sx={{ margin: "16px", fontWeight: "bold" }}>
          {`${file?.name ?? 'undefined'}`}
        </Box> */}
        {/* <Box
          sx={{
            borderRadius: borderRadius,
            border: `1px solid ${lightBorderGrey}`,
            marginTop: "8px",
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ margin: "16px", fontWeight: "bold" }}>
            {`${files?.name ?? 'undefined'}`}
          </Box>
        </Box> */}

        {files?.map((image, idx) => {
          return (
            <Box
              sx={{
                borderRadius: borderRadius,
                border: `1px solid ${lightBorderGrey}`,
                marginTop: "8px",
              }}
              key={idx}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={{ margin: "16px", fontWeight: "bold" }}>
                {image.name}
              </Box>
              <IconButton onClick={() => onDeleteAttachment(image)}>
              <Delete
                sx={{ height: "30px", width: "30px", padding: "0" }}
              >
              </Delete>
            </IconButton>
            </Box>
          );
        })}
        <Button 
          sx={{
            marginTop: "16px",
            fontWeight: "bold",
            color: "#F16E5F"
          }}
          component="label" 
          onClick={() => {
            // console.log('Clicked');
            handleUploadClick();
          }}
        >
        <Add sx={{ marginRight: "16px", color: primaryColor }} />
        Add Attachment
      </Button>
      {/* {attachment?.map((image, idx) => {
        return (
          <Box
            sx={{
              borderRadius: borderRadius,
              border: `1px solid ${lightBorderGrey}`,
              marginTop: "8px",
            }}
            key={idx}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ margin: "16px", fontWeight: "bold" }}>
              {image.fileName}
            </Box>
            <IconButton onClick={() => onDeleteAttachment(image)}>
              <Delete
                sx={{ height: "30px", width: "30px", padding: "0" }}
              >
              </Delete>
            </IconButton>
          </Box>
        );
      })} */}
    </Box>
  );
}


