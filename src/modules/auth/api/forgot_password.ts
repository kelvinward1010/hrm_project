import { BASE_URL, URL_FORGOT_PASSWORD } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { FormRule } from "antd";

interface ForgotPasswordProps {
    email: string;
}

export const useForgotPassword = async (data: ForgotPasswordProps): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_FORGOT_PASSWORD}`, data)
    return res;
}

export const RULES_FORGOT_PASSWORD: Record<keyof ForgotPasswordProps, FormRule[]> = {
    email: [
        { required: true, message: 'Please input your email!' }, 
        {pattern: new RegExp("^.+@.+\..+$"), message: "Email format is invalid"}
    ]
}