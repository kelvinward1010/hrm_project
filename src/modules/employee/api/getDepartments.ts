import { BASE_URL, URL_DEPARTMENT } from "@/constant/config";
import { apiClient } from "@/lib/api";

export const useGetDepartments = async (): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_DEPARTMENT}`)
    return res.data;
}