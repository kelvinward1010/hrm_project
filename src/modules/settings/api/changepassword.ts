import { BASE_URL, URL_CHANGE_PASSWORD } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IChangePassword } from "../type";
import { FormRule } from "antd";

export const useChangePassword = async (data: IChangePassword): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_CHANGE_PASSWORD}`, data)
    return res;
}


export const RULES_CHANGE_PASSWORD: Record<keyof IChangePassword, FormRule[]> = {
    password: [
        { required: true, message: 'Please input your password!' },
        { min: 8, message: "Password must have at least 8 characters" },
        { max: 16, message: "Password must have at most 16 characters" }
    ],
    password_confirmation: [
        {
            required: true,
            message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
            },
        }),
    ],
    email: [],
    company_id: []
}