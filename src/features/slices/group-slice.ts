import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Group } from "../../model/group.model";

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
});
export const { setId } = groupSlice.actions;
export const getOneGroup = (state: RootState) => state.group.id
export const getAllGroup = (state: RootState) => state.group.groupData;
export const getLoading = (state: RootState) => state.group.loading;
export const getGroupById = (id: number) => {
    return (state: RootState) => state.group.groupData.filter((_) => _.id === id)[0];
}
export default groupSlice.reducer

