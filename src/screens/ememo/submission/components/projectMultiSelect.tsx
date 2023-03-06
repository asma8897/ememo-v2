import { Control, Controller } from "react-hook-form";
import {
    Select,
    Chip,
    MenuItem,
    Theme,
    FormControl,
    OutlinedInput,
} from "@mui/material";
import { Project } from "../../../../model/project.model";
import { useState } from "react";

// export function MemoProjectMultiSelect({
//     control,
//     name,
//     projectDataList,
//     initialProjList,
//     errorComponent,
// }

// : FormFieldProp<Project>) {
//     const [projList, setProjList] = useState<any>(initialProjList)
// }