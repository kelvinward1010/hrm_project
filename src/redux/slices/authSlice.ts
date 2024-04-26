import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../actions/authAction";
import { IUserInfo } from "@/types";

interface AuthState {
    user: IUserInfo | null;
    token: string | null;
    result: boolean;
    isLoading: boolean;
}


const initialState: AuthState = {
    user: null,
    token: null,
    result: false,
    isLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.result = false;
            state.isLoading = false;
            state.user = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.token = action.payload?.token;
                    state.result = true;
                }
            )
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.result = false;
            });
    },
});

export const {
    logout,
    updateUser,
} = authSlice.actions;


export default authSlice.reducer;