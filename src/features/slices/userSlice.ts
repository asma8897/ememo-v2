import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";
import { User } from "../../model/user.model";

export const fetchAllUserAPI = createAsyncThunk<any, any, any>("user/getAPI", async (companyId) => {
    const apiResponse = await axios.get("http://localhost:3000/ememo/findAllUser");
    return apiResponse.data;
});

export const fetchOneUserAPI = createAsyncThunk<any, any, any>("user/getOneAPI", async (id) => {
    const apiResponse = await axios.get(`http://localhost:3000/ememo/${id}/findOneUser`);
    return apiResponse.data;
});

export const createNewUserAPI = createAsyncThunk<any, any, any>("user/createAPI", async (payload) => {
    const apiResponse = await axios.post("http://localhost:3000/ememo/createUser", payload);
    return apiResponse.data;
});

export const updateUserAPI = createAsyncThunk<any, any, any>("user/updateAPI", async (payload) => {
    const apiResponse = await axios.patch(`http://localhost:3000/ememo/updateUser/${payload.id}`, payload);
    return apiResponse.data;
});

export const deleteUserAPI = createAsyncThunk<any, any, any>("user/deleteAPI", async (id) => {
    const apiResponse = await axios.delete(`http://localhost:3000/ememo/removeUser/${id}`);
    return id;
});

export interface Id {
    id: number
}

const initialState = {
    loading: "idle",
    error: "",
    userData: [] as User[],
    id: null,
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload
        },
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.id = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUserAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllUserAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.userData = action.payload;
        });
        builder.addCase(createNewUserAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(createNewUserAPI.fulfilled, (state: any, action) => {
            state.loading = "idle";
            state.userData.unshift(action.payload);
        });
        builder.addCase(updateUserAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(updateUserAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.userData = state.userData.filter((_) => _.id !== action.payload.id);
            state.userData.unshift(action.payload);
        });
        builder.addCase(deleteUserAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(deleteUserAPI.fulfilled, (state, action) => {
            state.loading = "idle";
            state.userData = state.userData.filter((_) => _.id !== action.payload);
        });
    },
});

export const { setId, login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const getOneUser = (state: RootState) => state.user.id;
export const getAllUser = (state: RootState) => state.user.userData;
export const getLoading = (state: RootState) => state.user.loading;
export const getUserById = (id: number) => {
    return (state: RootState) => state.user.userData.filter((_) => _.id === id)[0];
}
export default userSlice.reducer

