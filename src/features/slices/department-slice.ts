import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Department } from "../../model/department.model";

export interface Id {
    id: number
}

const initialState = {
    loading: "idle",
    error: "",
    departmentData: [] as Department[],
    id: null
};

const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
    },
});
export const { setId } = departmentSlice.actions;
export const getOneDepartment = (state: RootState) => state.department.id;
export const getAllDepartment = (state: RootState) => state.department.departmentData;
export const getLoading = (state: RootState) => state.department.loading;
export const getDepartmentById = (id: number) => {
    return (state: RootState) => state.department.departmentData.filter((_) => _.id === id)[0];
}
export default departmentSlice.reducer

