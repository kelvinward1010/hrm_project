import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";

interface ForgotPasswordProps {
    page: number;
    search: string;
}

export const useGetEmployee = async (data: ForgotPasswordProps): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_EMPLOYEE}?page=${data?.page}&search=${data?.search}`)
    return res;
}