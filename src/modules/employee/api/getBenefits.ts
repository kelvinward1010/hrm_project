import { BASE_URL, URL_BENEFIT } from "@/constant/config";
import { apiClient } from "@/lib/api";

export const useGetBenefits = async (): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_BENEFIT}`)
    return res.data;
}