import { BASE_URL, URL_CHANGE_PASSWORD } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IChangePassword } from "../type";

export const useChangePassword = async (data: IChangePassword): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_CHANGE_PASSWORD}`, data)
    return res;
}