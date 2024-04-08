import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../actions/authAction";




const initialState = {
    token: null,
    result: null,
    message: null,
    isLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.token = action.payload;
                }
            )
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.result = action.payload;
            });
    },
});


export default authSlice.reducer;