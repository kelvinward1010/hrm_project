import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";

export const useGetDetailEmployee = async (id: string): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_EMPLOYEE}/${id}`);
    return res;
}