import { BASE_URL, URL_GRADE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IBaseOtherItem } from "@/types";

export const useGetGrades = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_GRADE}`)
    return res.data;
}