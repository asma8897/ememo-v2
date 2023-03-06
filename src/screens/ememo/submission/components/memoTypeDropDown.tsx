import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useGetAllMemoTypeQuery } from "../../../../features/api/memoTypeApi";

export function MemoTypeDropDown({
  control,
  chosenDepartment,
  ...props
}: MemoTypeDropDownProps) {
  const { data: memoTypeList, isLoading } = useGetAllMemoTypeQuery();
  return (
    <>
      <div>Memo Type *</div>
      <Controller
        name="memoType"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Box
            sx={{
              [`& fieldset`]: {
                borderRadius: "10px",
              },
            }}
          >
            <FormControl
              sx={{
                width: "100%",
              }}
              variant="outlined"
              {...props}
            >
              <Select value={value} onChange={onChange} label="Memo Type">
                {isLoading ? (
                  <MenuItem value="">
                    <em>Loading...</em>
                  </MenuItem>
                ) : memoTypeList?.length !== 0 ? (
                  memoTypeList
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
              </Select>
            </FormControl>
          </Box>
        )}
      />
    </>
  );
}

interface MemoTypeDropDownProps {
    control: Control<any>;
    chosenDepartment: string;
}
