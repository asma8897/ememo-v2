import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/user.model";

export type createMemoLoopState = {
  memoLoopCreateDialogOpen: boolean;
  selectedMemoLoopUsers: User[];
  id: number;
};

const initialState: createMemoLoopState = {
  memoLoopCreateDialogOpen: false,
  selectedMemoLoopUsers: [],
  id: 0,
};

export const createMemoLoopSlice = createSlice({
  name: "memoLoop",
  initialState,
  reducers: {
    openCreateMemoLoopDialog: (state) => {
      state.memoLoopCreateDialogOpen = true;
    },
    closeCreateMemoLoopDialog: (state) => {
      state.memoLoopCreateDialogOpen = false;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },

    // setMemoLoopUser: (state, action: PayloadAction<User[]>) => {
    //     state.selectedMemoLoopUsers = action.payload;
    // },
    addMemoLoopUser: (state, action: PayloadAction<User>) => {
      state.selectedMemoLoopUsers = [
        ...state.selectedMemoLoopUsers,
        action.payload,
      ];
    },
    removeMemoLoopUser: (state, action: PayloadAction<User>) => {
      const userId = action.payload.id;
      state.selectedMemoLoopUsers = state.selectedMemoLoopUsers.filter(
        (approver => approver.id !== userId)
      );
    },
  },
});

export const {
  openCreateMemoLoopDialog,
  closeCreateMemoLoopDialog,
  setId,
  // setMemoLoopUser,
  addMemoLoopUser,
  removeMemoLoopUser,
} = createMemoLoopSlice.actions;
