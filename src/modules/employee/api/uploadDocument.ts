import { BASE_URL, URL_UPLOAD_DOCUMENT } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { AxiosRequestConfig } from "axios";

export const useEmployeeDocumentUpload = async (data: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `${BASE_URL}${URL_UPLOAD_DOCUMENT}`,
        data: data,
        headers: {
            accept: "application/json",
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await apiClient(config);
    return res;
}