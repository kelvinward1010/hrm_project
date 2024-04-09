import { BASE_URL } from "@/constant/config";
import { apiClient } from "@/lib/api";
import storage from "@/utils/storage";
import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import { logout } from "../slices/authSlice";



export interface AuthResponse {
    result: boolean;
    message: string;
    token: any;
}

interface LoginValues {
    username: string;
    password: string;
    company_id: number;
}


export const login = createAsyncThunk<AuthResponse, LoginValues, { rejectValue: string }>(
    'authentication/login',
    async (credentials, { rejectWithValue }) => {
        try {

            const config: AxiosRequestConfig = {
                method: 'POST',
                url: `${BASE_URL}/login`,
                data: credentials,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await apiClient(config);
            const data: AuthResponse = await response.data;
            storage.setToken(data?.token)
            return data;
        } catch (error: any) {
            return rejectWithValue(error.data);
        }
    }
);

export const signOut = async (dispatch: Dispatch) => {
    const res = await apiClient.post(`/logout`);
    dispatch(logout())
    storage.clearToken();
    return res
}