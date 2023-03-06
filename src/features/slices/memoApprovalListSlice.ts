import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { MemoApproval } from "../../model/memo-approval.model";
import { Group } from "../../model/group.model";
import { SelectedApproval } from "../../model/selectedApprovalUser.model";
import { RootState } from "../../app/store";

export type MemoApprovalListState = {
  approvalList: Group[];
  selectedApprovalList: Partial<MemoApproval>[];
  approverDialogStatus: boolean;
  emptyApproverError: boolean;
};

const initialState: MemoApprovalListState = {
  approvalList: [],
  selectedApprovalList: [],
  approverDialogStatus: false,
  emptyApproverError: false,
};

export const memoApprovalListSlice = createSlice({
  name: "approvalList",
  initialState,
  reducers: {
    setApproverDialog: (state, action: PayloadAction<boolean>) => {
      state.approverDialogStatus = action.payload;
    },
    setApprovalList: (state, action: PayloadAction<Group[]>) => {
      state.approvalList = action.payload;
    },
    clearApprovalList: (state) => {
      state.approvalList = [];
    },
    addSelectedApprovalList: (
      state,
      action: PayloadAction<SelectedApproval>
    ) => {
      // const user = action.payload.userData;
      // const memo = action.payload.memoId;
      // const memoStatus = action.payload.memoStatusId;
      // const createdOn = action.payload.createdOn;
      const group = action.payload.groupData;
      const newApprover: Partial<MemoApproval> = {
        groupId: group.id,
        // memoId: memo,
        // createdOn: createdOn,
        order: state.selectedApprovalList.length + 1,
        // memoStatusId: memoStatus,
      };
      state.selectedApprovalList = [...state.selectedApprovalList, newApprover];
      state.approverDialogStatus = false;
    },
    removeSelectedApprovalList: (state, action: PayloadAction<number>) => {
      const userIdRemove = action.payload;
      const newOrder = state.selectedApprovalList
        .slice()
        .sort((a, b) => a.order! - b.order!);
      const filtered = newOrder
        .filter((approval) => approval.userId !== userIdRemove)
        .map((user, idx) => ({
          ...user,
          order: idx + 1,
        }));
        state.selectedApprovalList = filtered;
    },
    clearSelectedApproval: (state) => {
      state.selectedApprovalList = [];
    },
    setSelectedApproval: (
      state,
      action: PayloadAction<Partial<MemoApproval>[]>
    ) => {
      state.selectedApprovalList = action.payload;
    },
    setEmptyApprovalError: (state, action: PayloadAction<boolean>) => {
      state.emptyApproverError = action.payload;
    },
  },
});

export const {
    setApproverDialog,
    setApprovalList,
    clearApprovalList,
    addSelectedApprovalList,
    removeSelectedApprovalList,
    setSelectedApproval,
    setEmptyApprovalError,
} = memoApprovalListSlice.actions;
