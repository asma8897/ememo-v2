import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Company } from "../../model/company.model";

export interface Id {
    id: number
}

const initialState = {
    loading: "idle",
    error: "",
    companyData: [] as Company[],
    id: null
};

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
    },
});

export const { setId } = companySlice.actions;
export const getOneCompany = (state: RootState) => state.company.id;
export const getCompanyById = (id: number) => {
    // return (state: RootState) => state.company.companyData.filter((_) => _.id === id)[0];
}
export default companySlice.reducer

