import { BASE_URL, URL_POSITION } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IBaseOtherItem } from "@/types";

export const useGetPositions = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_POSITION}`)
    return res.data;
}