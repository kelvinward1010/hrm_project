import { BASE_URL, URL_POSITION } from "@/constant/config";
import { apiClient } from "@/lib/api";

export const useGetPositions = async (): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_POSITION}`)
    return res.data;
}