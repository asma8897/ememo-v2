import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";
import { MemoAttachment } from "../../model/memo-attachment.model";

export const fetchAllMemoAttachmentAPI = createAsyncThunk<any, any, any>("memoAttachment/getAPI", async (memoAttachmentId) => {
    const apiResponse = await axios.get("http://localhost:3000/ememo/findAllMemoAttachment");
    return apiResponse.data;
});

export const createNewMemoAttachmentAPI = createAsyncThunk<any, any, any>("memoAttachment/createAPI", async (payload) => {
    const apiResponse = await axios.post("http://localhost:3000/ememo/createMemoAttachment", payload);
    return apiResponse.data;
});

export const updateMemoAttachmentAPI = createAsyncThunk<any, any, any>("memoAttachment/updateAPI", async (payload) => {
    const apiResponse = await axios.patch(`http://localhost:3000/ememo/updateMemoAttachment/${payload.id}`, payload);
    return apiResponse.data;
});

export const deleteMemoAttachmentAPI = createAsyncThunk<any, any, any>("memoAttachment/deleteAPI", async (id) => {
    const apiResponse = await axios.delete(`http://localhost:3000/ememo/removeMemoAttachment/${id}`);
    return id;
});

export interface Id {
    id: number
}

const initialState = {
    loading: "idle",
    error: "",
    attachmentData: [] as MemoAttachment[],
    id: null
};

const memoAttachmentSlice = createSlice({
    name: "memoAttachment",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllMemoAttachmentAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllMemoAttachmentAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.attachmentData = action.payload;
        });
        builder.addCase(createNewMemoAttachmentAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(createNewMemoAttachmentAPI.fulfilled, (state: any, action) => {
            state.loading = "idle";
            state.attachmentData.unshift(action.payload);
        });
        builder.addCase(updateMemoAttachmentAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(updateMemoAttachmentAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.attachmentData = state.attachmentData.filter((_) => _.id !== action.payload.id);
            state.attachmentData.unshift(action.payload);
        });
        builder.addCase(deleteMemoAttachmentAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(deleteMemoAttachmentAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.attachmentData = state.attachmentData.filter((_) => _.id !== action.payload);
        });
    },
});

export const { setId } = memoAttachmentSlice.actions;
export const getOneMemoAttachment = (state: RootState) => state.memoAttachment.id;
export const getAllMemoAttachment = (state: RootState) => state.memoAttachment.attachmentData;
export const getLoading = (state: RootState) => state.memoAttachment.loading;
export const getMemoAttachmentById = (id: number) => {
    return (state: RootState) => state.memoAttachment.attachmentData.filter((_) => _.id === id)[0];
}
export default memoAttachmentSlice.reducer

