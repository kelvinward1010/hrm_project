import { IDetailEmployee } from "@/types/employee";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    employee: IDetailEmployee | null;
    isLoading: boolean;
}


const initialState: AuthState = {
    employee: null,
    isLoading: false,
};

export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        employeeDetail: (state, action) => {
            state.employee = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    employeeDetail,
} = employeeSlice.actions;

export default employeeSlice.reducer;