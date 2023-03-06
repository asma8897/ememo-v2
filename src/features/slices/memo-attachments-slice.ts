import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { MemoAttachment } from "../../model/memo-attachment.model";

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
});
export const { setId } = memoAttachmentSlice.actions;
export const getOneMemoAttachment = (state: RootState) => state.memoAttachment.id;
export const getAllMemoAttachment = (state: RootState) => state.memoAttachment.attachmentData;
export const getLoading = (state: RootState) => state.memoAttachment.loading;
export const getMemoAttachmentById = (id: number) => {
    return (state: RootState) => state.memoAttachment.attachmentData.filter((_) => _.id === id)[0];
}
export default memoAttachmentSlice.reducer

