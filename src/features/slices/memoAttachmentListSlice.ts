import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { MemoAttachment } from "../../model/memo-attachment.model";

export type MemoAttachmentListState = {
    attachmentList: MemoAttachment[];
};

const initialState: MemoAttachmentListState = {
    attachmentList: [],
};

export const memoAttachmentListSlice = createSlice({
  name: "attachmentList",
  initialState,
  reducers: {
    addMemoAttachment: (state, action: PayloadAction<MemoAttachment>) => {
      state.attachmentList = [
        ...state.attachmentList,
        action.payload,
      ];
    },
    removeMemoAttachment: (state, action: PayloadAction<MemoAttachment>) => {
      const attachmentId = action.payload.id;
      state.attachmentList = state.attachmentList.filter(
        (attach) => attach.id !== attachmentId
      );
    },
    setAttachmentList: (state, action: PayloadAction<MemoAttachment[]>) => {
        state.attachmentList = action.payload;
    },
  },
});

export const {
    addMemoAttachment,
    removeMemoAttachment,
    setAttachmentList,
} = memoAttachmentListSlice.actions;
