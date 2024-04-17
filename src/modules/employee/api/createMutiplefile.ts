import { BASE_URL, URL_SAVE_MUTIPLE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { AxiosRequestConfig } from "axios";

export const useContractSaveMutiple = async (data: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `${BASE_URL}${URL_SAVE_MUTIPLE}`,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await apiClient(config);
    return res;
}