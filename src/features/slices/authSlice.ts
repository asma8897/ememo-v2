import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type AuthState = {
    isLoggedIn: boolean;
    name: string;
    loading: boolean;
};

const initialState: AuthState = {
    isLoggedIn: false,
    name: "",
    loading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        endLoading: (state) => {
            state.loading = false;
        },
    },
});

export default authSlice.reducer;
