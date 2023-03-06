import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Project } from "../../model/project.model";

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
});
export const { setId } = projectSlice.actions;
export const getOneProject = (state: RootState) => state.project.id;
export const getAllProject = (state: RootState) => state.project.projectData;
export const getLoading = (state: RootState) => state.project.loading;
export const getProjectById = (id: number) => {
    return (state: RootState) => state.project.projectData.filter((_) => _.id === id)[0];
}
export default projectSlice.reducer

