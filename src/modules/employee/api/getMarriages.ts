import { BASE_URL, URL_MARRIAGE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IBaseOtherItem } from "@/types";

export const useGetMarriages = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_MARRIAGE}`);
    return res.data;
}