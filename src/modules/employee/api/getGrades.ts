import { BASE_URL, URL_GRADE } from "@/constant/config";
import { apiClient } from "@/lib/api";

export const useGetGrades = async (): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_GRADE}`)
    return res.data;
}