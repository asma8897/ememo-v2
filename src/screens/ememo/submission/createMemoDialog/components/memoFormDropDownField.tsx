import { FormControl, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";

export function MemoFormDropDownField({
  control,
  name,
  label,
  defaultValue,
  // onMenuChange = (value) => {},
  children,
}: MemoFormDropDownFieldProps) {
  return (
    <div style={{ width: "100%" }}>
      <div>{label}</div>
      <Controller
        name={name}
        defaultValue={defaultValue}
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
                PaperProps: {
                  onScroll: (event: any) => {},
                },
                style: { maxHeight: 300 },
              }}
              value={value}
              onChange={onChange}
              // onChange={(newValue) => {
              //   onMenuChange(newValue);
              //   onChange(newValue);
              // }}
            >
              {children}
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
}

interface MemoFormDropDownFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  defaultValue: any;
  onMenuChange?: (value: any) => void;
  children?: React.ReactNode;
}
