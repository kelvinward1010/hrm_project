import { BASE_URL, URL_DEPARTMENT } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IBaseOtherItem } from "@/types";

export const useGetDepartments = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_DEPARTMENT}`)
    return res.data;
}