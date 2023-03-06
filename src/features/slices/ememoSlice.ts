import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Ememo } from "../../model/ememo.model";
import { MemoAttachment } from "../../model/memo-attachment.model"

export type EMemoState = {
    attachmentList: MemoAttachment[];
    activeMemoDetail: Ememo | null;
    activeMemoState: "loading" | "idle";
    activeEditEMemo: Partial<Ememo | null>;
};

const initialState: EMemoState = {
    attachmentList: [],
    activeMemoDetail: null,
    activeMemoState: "loading",
    activeEditEMemo: null,
};

export const EMemoSlice = createSlice({
    name: "ememo",
    initialState,
    reducers: {
        setAttachmentList: (state, action: PayloadAction<MemoAttachment[]>) => {
            state.attachmentList = action.payload;
        },
        removeAttachment: (state, action: PayloadAction<MemoAttachment>) => {
            const attachmentId = action.payload.id;
            state.attachmentList = state.attachmentList.filter(
                (attach => attach.id !== attachmentId)
            );
        },
        setCurrentActiveMemoDetail: (state, action: PayloadAction<Ememo>) => {
            state.activeMemoDetail = action.payload;
        },
        activeMemoDetailLoading: (state) => {
            state.activeMemoState = "loading";
        },
        activeMemoDetailIdle: (state) => {
            state.activeMemoState = "idle";
        },
        createActiveEmemo: (state, action: PayloadAction<Partial<Ememo>>) => {
            state.activeEditEMemo = action.payload;
        },
        clearActiveEmemo: (state) => {
            state.activeEditEMemo = null;
        }
    },
});

export const {
    setAttachmentList,
    removeAttachment,
    setCurrentActiveMemoDetail,
    activeMemoDetailLoading, 
    createActiveEmemo,
    clearActiveEmemo,
} = EMemoSlice.actions;


