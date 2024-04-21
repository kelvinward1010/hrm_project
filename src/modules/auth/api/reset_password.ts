import { BASE_URL, URL_RESET_PASSWORD } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { FormRule } from "antd";
import { useMutation } from "react-query";


export interface ResetPasswordProps {
    email: string;
    company_id: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export const resetPassword = async (data: ResetPasswordProps): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_RESET_PASSWORD}`, data)
    return res;
}

type UseResetPasswordOptions = {
    config?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = ({ config }: UseResetPasswordOptions) => {
    return useMutation({
        onMutate: () => { },
        onError: () => { },
        onSuccess: () => { },
        ...config,
        mutationFn: resetPassword,
    });
};

export const RULES_RESET_PASSWORD: Record<keyof ResetPasswordProps, FormRule[]> ={
    email: [],
    company_id: [],
    password: [
        { required: true, message: 'Please input your password!' },
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
    token: []
}