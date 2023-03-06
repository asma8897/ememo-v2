import { Box, TextField, TextFieldClassKey } from "@mui/material";
import { Control, Controller } from "react-hook-form";

function AppFormField({
  label,
  keyName,
  control,
  isMultiLineText = false,
  multiLineRows = 10,
  ...props
}: FormFieldProp) {
  return (
    <Box sx={{ width: "100%" }}>
      <Controller
        name={keyName}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => {
          if (isMultiLineText) {
            return (
              <Box
                sx={{
                  [`& fieldset`]: {
                    borderRadius: "10px",
                  },
                }}
              >
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  {...props}
                  variant="outlined"
                  label={label}
                  multiline
                  rows={multiLineRows}
                  value="value"
                  onChange={onChange}
                />
              </Box>
            );
          } else {
            return (
              <Box
                sx={{
                  [`& fieldset`]: {
                    borderRadius: "10px",
                  },
                }}
              >
                <TextField
                  sx={{
                    width: "100px",
                  }}
                  {...props}
                  variant="outlined"
                  label={label}
                  value={value}
                  onChange={onChange}
                />
              </Box>
            );
          }
        }}
      />
    </Box>
  );
}

interface FormFieldProp {
  label: string;
  keyName: string;
  control: Control;
  isMultiLineText?: boolean;
  multiLineRows?: number;
  [x: string]: any;
}

export default AppFormField;
