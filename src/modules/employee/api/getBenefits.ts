import { BASE_URL, URL_BENEFIT } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IBaseOtherItem } from "@/types";

export const useGetBenefits = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_BENEFIT}`)
    return res.data;
}