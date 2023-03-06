import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";
import { Department } from "../../model/department.model";

export const fetchAllDepartmentAPI = createAsyncThunk<any, any, any>("department/getAPI", async (departmentId) => {
    const apiResponse = await axios.get("http://localhost:3000/ememo/findAllDepartment");
    return apiResponse.data;
});

export const fetchOneDepartmentAPI = createAsyncThunk<any, any, any>("department/getOneAPI", async (id) => {
    const apiResponse = await axios.get(`http://localhost:3000/ememo/${id}/findOneDepartment`);
    return apiResponse.data;
});

export const createNewDepartmentAPI = createAsyncThunk<any, any, any>("department/createAPI", async (payload) => {
    const apiResponse = await axios.post("http://localhost:3000/ememo/createDepartment", payload);
    return apiResponse.data;
});

export const updateDepartmentAPI = createAsyncThunk<any, any, any>("department/updateAPI", async (payload) => {
    const apiResponse = await axios.patch(`http://localhost:3000/ememo/updateDepartment/${payload.id}`, payload);
    return apiResponse.data;
});

export const deleteDepartmentAPI = createAsyncThunk<any, any, any>("department/deleteAPI", async (id) => {
    const apiResponse = await axios.delete(`http://localhost:3000/ememo/removeDepartment/${id}`);
    return id;
});

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
    extraReducers: (builder) => {
        builder.addCase(fetchAllDepartmentAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllDepartmentAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.departmentData = action.payload;
        });
        builder.addCase(createNewDepartmentAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(createNewDepartmentAPI.fulfilled, (state: any, action) => {
            state.loading = "idle";
            state.departmentData.unshift(action.payload);
        });
        builder.addCase(updateDepartmentAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(updateDepartmentAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.departmentData = state.departmentData.filter((_) => _.id !== action.payload.id);
            state.departmentData.unshift(action.payload);
        });
        builder.addCase(deleteDepartmentAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(deleteDepartmentAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.departmentData = state.departmentData.filter((_) => _.id !== action.payload);
        });
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

