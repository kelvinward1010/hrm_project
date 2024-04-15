import { BASE_URL, URL_MARRIAGE } from "@/constant/config";
import { apiClient } from "@/lib/api";

export const useGetMarriages = async (): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_MARRIAGE}`)
    return res.data;
}