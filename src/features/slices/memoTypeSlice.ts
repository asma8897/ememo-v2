import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";
import { MemoType } from "../../model/memo-type.model";

export const fetchAllMemoTypeAPI = createAsyncThunk<any, any, any>("memoType/getAPI", async (companyId) => {
    const apiResponse = await axios.get("http://localhost:3000/ememo/findAllMemoType");
    return apiResponse.data;
});

export const fetchOneMemoTypeAPI = createAsyncThunk<any, any, any>("memoType/getOneAPI", async (id) => {
    const apiResponse = await axios.get(`http://localhost:3000/ememo/${id}/findOneMemoType`);
    return apiResponse.data;
});

export const createNewMemoTypeAPI = createAsyncThunk<any, any, any>("memoType/createAPI", async (payload) => {
    const apiResponse = await axios.post("http://localhost:3000/ememo/createMemoType", payload);
    return apiResponse.data;
});

export const updateMemoTypeAPI = createAsyncThunk<any, any, any>("memoType/updateAPI", async (payload) => {
    const apiResponse = await axios.patch(`http://localhost:3000/ememo/updateMemoType/${payload.id}`, payload);
    return apiResponse.data;
});

export const deleteMemoTypeAPI = createAsyncThunk<any, any, any>("memoType/deleteAPI", async (id) => {
    const apiResponse = await axios.delete(`http://localhost:3000/ememo/removeMemoType/${id}`);
    return id;
});

export interface Id {
    id: number
}

const initialState = {
    loading: "idle",
    error: "",
    memoTypeData: [] as MemoType[],
    id: null
};

const memoTypeSlice = createSlice({
    name: "memoType",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllMemoTypeAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllMemoTypeAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.memoTypeData = action.payload;
        });
        builder.addCase(createNewMemoTypeAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(createNewMemoTypeAPI.fulfilled, (state: any, action) => {
            state.loading = "idle";
            state.memoTypeData.unshift(action.payload);
        });
        builder.addCase(updateMemoTypeAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(updateMemoTypeAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.memoTypeData = state.memoTypeData.filter((_) => _.id !== action.payload.id);
            state.memoTypeData.unshift(action.payload);
        });
        builder.addCase(deleteMemoTypeAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(deleteMemoTypeAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.memoTypeData = state.memoTypeData.filter((_) => _.id !== action.payload);
        });
    },
});

export const { setId } = memoTypeSlice.actions;
export const getOneMemoType = (state: RootState) => state.memoType.id;
export const getAllMemoType = (state: RootState) => state.memoType.memoTypeData;
export const getLoading = (state: RootState) => state.memoType.loading;
export const getMemoTypeById = (id: number) => {
    return (state: RootState) => state.memoType.memoTypeData.filter((_) => _.id === id)[0];
}
export default memoTypeSlice.reducer

