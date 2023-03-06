import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { MemoType } from "../../model/memo-type.model";

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
});
export const { setId } = memoTypeSlice.actions;
export const getOneMemoType = (state: RootState) => state.memoType.id;
export const getAllMemoType = (state: RootState) => state.memoType.memoTypeData;
export const getLoading = (state: RootState) => state.memoType.loading;
export const getMemoTypeById = (id: number) => {
    return (state: RootState) => state.memoType.memoTypeData.filter((_) => _.id === id)[0];
}
export default memoTypeSlice.reducer

