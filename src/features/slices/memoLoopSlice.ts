import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MemoLoopState = {
    memoLoopDialogOpen: boolean;
};

const initialState: MemoLoopState = {
    memoLoopDialogOpen: false,
};

export const MemoLoopSlice = createSlice({
    name: "memoLoop",
    initialState,
    reducers: {
        setMemoLoopDialog: (state, action: PayloadAction<boolean>) => {
            state.memoLoopDialogOpen = action.payload;
        },
    },
});

export const { setMemoLoopDialog } = MemoLoopSlice.actions;