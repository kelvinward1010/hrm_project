import { BASE_URL, URL_FORGOT_PASSWORD } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { FormRule } from "antd";
import { useMutation } from "react-query";

interface ForgotPasswordProps {
    email: string;
}

export const forgotPassword = async (data: ForgotPasswordProps): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_FORGOT_PASSWORD}`, data)
    return res;
}

type UseForgotPasswordOptions = {
    config?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({ config }: UseForgotPasswordOptions) => {
    return useMutation({
        onMutate: () => { },
        onError: () => { },
        onSuccess: () => { },
        ...config,
        mutationFn: forgotPassword,
    });
};


export const RULES_FORGOT_PASSWORD: Record<keyof ForgotPasswordProps, FormRule[]> = {
    email: [
        { required: true, message: 'Please input your email!' }, 
        {pattern: new RegExp("^.+@.+\..+$"), message: "Email format is invalid"}
    ]
}