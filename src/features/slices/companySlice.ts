import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";
import { Company } from "../../model/company.model";

// https://www.youtube.com/watch?v=SgnlgEEkqSo
// https://www.membug.com/note/72f48c5bbab40
// https://www.softkraft.co/how-to-setup-slices-with-redux-toolkit/
// https://www.learmoreseekmore.com/2022/09/reactjs-v18-redux-toolkit-statemangement-crud-example.html
// https://www.youtube.com/watch?v=bbkBuqC1rU4

export const fetchAllCompanyAPI = createAsyncThunk<any, any, any>("company/getAPI", async (companyId) => {
    const apiResponse = await axios.get("http://localhost:3000/ememo/findAllCompany");
    return apiResponse.data;
});

export const fetchOneCompanyAPI = createAsyncThunk<any, any, any>("company/getOneAPI", async (id) => {
    const apiResponse = await axios.get(`http://localhost:3000/ememo/${id}/findOneCompany`);
    return apiResponse.data;
});

export const createNewCompanyAPI = createAsyncThunk<any, any, any>("company/createAPI", async (payload) => {
    const apiResponse = await axios.post("http://localhost:3000/ememo/createCompany", payload);
    return apiResponse.data;
});

export const updateCompanyAPI = createAsyncThunk<any, any, any>("company/updateAPI", async (payload) => {
    const apiResponse = await axios.patch(`http://localhost:3000/ememo/updateCompany/${payload.id}`, payload);
    return apiResponse.data;
});

export const deleteCompanyAPI = createAsyncThunk<any, any, any>("company/deleteAPI", async (id) => {
    const apiResponse = await axios.delete(`http://localhost:3000/ememo/removeCompany/${id}`);
    return id;
});

export interface Id {
    id: number
}

const initialState = {
    loading: "idle",
    error: "",
    company: [] as Company[],
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
    extraReducers: (builder) => {
        builder.addCase(fetchAllCompanyAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllCompanyAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.company = action.payload;
        });
        builder.addCase(createNewCompanyAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(createNewCompanyAPI.fulfilled, (state: any, action) => {
            state.loading = "idle";
            state.company.unshift(action.payload);
        });
        builder.addCase(updateCompanyAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(updateCompanyAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.company = state.company.filter((_) => _.id !== action.payload.id);
            state.company.unshift(action.payload);
        });
        builder.addCase(deleteCompanyAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(deleteCompanyAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.company = state.company.filter((_) => _.id !== action.payload);
        });
    },
});
// console.log(companySlice);
// export const { getCompany, addCompany } = companySlice.actions
// export const { allComapaniesLoading, allCompaniesReceived } = companySlice.actions;

export const { setId } = companySlice.actions;
export const getOneCompany = (state: RootState) => state.company.id;
export const getAllCompany = (state: RootState) => state.company.company;
export const getLoading = (state: RootState) => state.company.loading;
export const getCompanyById = (id: number) => {
    return (state: RootState) => state.company.company.filter((_) => _.id === id)[0];
}
export default companySlice.reducer

