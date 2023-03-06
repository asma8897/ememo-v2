import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export function AppEditorField() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  return (
    <Controller
      name="content"
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
  );
}
