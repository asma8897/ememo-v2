import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

export function MemoFormField({
  control,
  name,
  label,
  defaultValue,
//   errorComponent,
  type = "text",
  multiline = false,
}: MemoFormFieldProp) {
  return (
    <div style={{ width: "100%" }}>
      <div>{label}</div>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              "& label.Mui-focused": {
                display: "none",
              },
              [`& fieldset`]: {
                borderRadius: "10px",
                width: "100%",
              },
            }}
            fullWidth
            onChange={onChange}
            value={value}
            variant="outlined"
            type={type}
            multiline={multiline}
          />
        )}
      />
      {/* {errorComponent} */}
    </div>
  );
}

interface MemoFormFieldProp {
  control: Control<any>;
  name: string;
  label: string;
  defaultValue: any;
//   errorComponent: any;
  type?: "text" | "number" | "password";
  multiline?: boolean;
}
