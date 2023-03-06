import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";
import { Project } from "../../model/project.model";

export const fetchAllProjectAPI = createAsyncThunk<any, any, any>("project/getAPI", async (projectId) => {
    const apiResponse = await axios.get("http://localhost:3000/ememo/findAllProject");
    return apiResponse.data;
});

export const fetchOneProjectAPI = createAsyncThunk<any, any, any>("project/getOneAPI", async (id) => {
    const apiResponse = await axios.get(`http://localhost:3000/ememo/${id}/findOneProject`);
    return apiResponse.data;
});

export const createNewProjectAPI = createAsyncThunk<any, any, any>("project/createAPI", async (payload) => {
    const apiResponse = await axios.post("http://localhost:3000/ememo/createProject", payload);
    return apiResponse.data;
});

export const updateProjectAPI = createAsyncThunk<any, any, any>("project/updateAPI", async (payload) => {
    const apiResponse = await axios.patch(`http://localhost:3000/ememo/updateProject/${payload.id}`, payload);
    return apiResponse.data;
});

export const deleteProjectAPI = createAsyncThunk<any, any, any>("project/deleteAPI", async (id) => {
    const apiResponse = await axios.delete(`http://localhost:3000/ememo/removeProject/${id}`);
    return id;
});

export interface Id {
    id: number
}

const initialState = {
    loading: "idle",
    error: "",
    projectData: [] as Project[],
    id: null
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProjectAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllProjectAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.projectData = action.payload;
        });
        builder.addCase(createNewProjectAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(createNewProjectAPI.fulfilled, (state: any, action) => {
            state.loading = "idle";
            state.projectData.unshift(action.payload);
        });
        builder.addCase(updateProjectAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(updateProjectAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.projectData = state.projectData.filter((_) => _.id !== action.payload.id);
            state.projectData.unshift(action.payload);
        });
        builder.addCase(deleteProjectAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(deleteProjectAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.projectData = state.projectData.filter((_) => _.id !== action.payload);
        });
    },
});

export const { setId } = projectSlice.actions;
export const getOneProject = (state: RootState) => state.project.id;
export const getAllProject = (state: RootState) => state.project.projectData;
export const getLoading = (state: RootState) => state.project.loading;
export const getProjectById = (id: number) => {
    return (state: RootState) => state.project.projectData.filter((_) => _.id === id)[0];
}
export default projectSlice.reducer

