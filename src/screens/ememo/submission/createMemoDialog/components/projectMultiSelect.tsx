import { OutboundOutlined } from "@mui/icons-material";
import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useGetAllProjectQuery } from "../../../../../features/api/projectApi";
import { Project } from "../../../../../model/project.model";

export function MemoProjectMultiSelect({
  control,
  name,
  projectDataList,
  initialProjList,
}: FormFieldProp<Project>) {
  const{ data: projList } = useGetAllProjectQuery();
  const theme = useTheme();
  const [projName, setProjName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof projName>) => {
    const {
      target: { value },
    } = event;
    setProjName(typeof value === "string" ? value.split(",") : value);
  };
  
  function getStyles(name: string, projName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        projName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
  const [proje, setProje] = useState<any>(initialProjList ?? []);

  return (
    <>
      <div>Projects</div>
      <Controller
        defaultValue={projName}
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Box
            sx={{
              [`& fieldset`]: {
                borderRadius: "10px",
              },
            }}
          >
            <FormControl sx={{ width: "100px" }} variant="outlined">
              <Select
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
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {proje.map((id: any) => {
                      const name = projectDataList.find(
                        (p) => p.id === id
                      )?.name;
                      return (
                        <Chip 
                          sx={{ margin: 2 }}
                          key={id}
                          label={name}
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                          onDelete={() => {
                            setProje((proje: any) => [
                              ...proje.filter((projId: any) => projId !== id), 
                            ]);
                            onChange([
                              ...proje.filter((projId: any) => projId !== id),
                            ]);
                          }}

                        />
                      )
                    })}
                 
                    {/* {selected.map((value: any) => (
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
                    ))} */}
                  </div>
                )}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {projList?.map((proj: Project) => (
                  <MenuItem
                    key={proj.id}
                    value={proj.name}
                    style={getStyles(proj.name, projName, theme)}
                  >
                    {`${proj.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      />
    </>
  );
}

interface FormFieldProp<T> {
  control: Control<any>;
  name: string;
  projectDataList: Project[];
  initialProjList: string[];
}
