import { BASE_URL, URL_FORGOT_PASSWORD } from "@/constant/config";
import { apiClient } from "@/lib/api";

interface ForgotPasswordProps {
    email: string;
}

export const useForgotPassword = async (data: ForgotPasswordProps): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_FORGOT_PASSWORD}`, data)
    return res;
}