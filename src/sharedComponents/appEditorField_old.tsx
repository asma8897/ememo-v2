import React from "react";
import { Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

export function AppEditorFieldOld({
  control,
  name,
  label,
  defaultValue,
  errorComponent,
  type = "text",
  multiline = false,
}: MemoFormFieldProp) {
  return (
    <Box sx={{ width: "100%" }}>
      <div>{label}</div>
      <Controller
        name={name}
        defaultValue={defaultValue}
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
            type={type}
            multiline={multiline}
          />
        )}
      />
      {errorComponent}
    </Box>
  );
}

interface MemoFormFieldProp {
  control: Control<any>;
  name: string;
  label: string;
  defaultValue: any;
  errorComponent: any;
  type?: "text" | "number" | "password";
  multiline?: boolean;
}
