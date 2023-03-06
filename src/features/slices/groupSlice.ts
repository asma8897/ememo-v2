import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";
import { Group } from "../../model/group.model";

export const fetchAllGroupAPI = createAsyncThunk<any, any, any>("group/getAPI", async (groupId) => {
    const apiResponse = await axios.get("http://localhost:3000/ememo/findAllGroup");
    return apiResponse.data;
});

export const fetchOneGroupAPI = createAsyncThunk<any, any, any>("group/getOneAPI", async (id) => {
    const apiResponse = await axios.get(`http://localhost:3000/ememo/${id}/findOneGroup`);
    return apiResponse.data;
});

export const createNewGroupAPI = createAsyncThunk<any, any, any>("group/createAPI", async (payload) => {
    const apiResponse = await axios.post("http://localhost:3000/ememo/createGroup", payload);
    return apiResponse.data;
});

export const updateGroupAPI = createAsyncThunk<any, any, any>("group/updateAPI", async (payload) => {
    const apiResponse = await axios.patch(`http://localhost:3000/ememo/updateGroup/${payload.id}`, payload);
    return apiResponse.data;
});

export const deleteGroupAPI = createAsyncThunk<any, any, any>("group/deleteAPI", async (id) => {
    const apiResponse = await axios.delete(`http://localhost:3000/ememo/removeGroup/${id}`);
    return id;
});

export interface Id {
    id: number
}

const initialState = {
    loading: "idle",
    error: "",
    groupData: [] as Group[],
    id: null
};

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllGroupAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllGroupAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.groupData = action.payload;
        });
        builder.addCase(createNewGroupAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(createNewGroupAPI.fulfilled, (state: any, action) => {
            state.loading = "idle";
            state.groupData.unshift(action.payload);
        });
        builder.addCase(updateGroupAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(updateGroupAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.groupData = state.groupData.filter((_) => _.id !== action.payload.id);
            state.groupData.unshift(action.payload);
        });
        builder.addCase(deleteGroupAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(deleteGroupAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.groupData = state.groupData.filter((_) => _.id !== action.payload);
        });
    },
});

export const { setId } = groupSlice.actions;
export const getOneGroup = (state: RootState) => state.group.id;
export const getAllGroup = (state: RootState) => state.group.groupData;
export const getLoading = (state: RootState) => state.group.loading;
export const getGroupById = (id: number) => {
    return (state: RootState) => state.group.groupData.filter((_) => _.id === id)[0];
}
export default groupSlice.reducer

