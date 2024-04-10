import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ICreateEmployee } from "../types";

export const useCreateEmployee = async (data: ICreateEmployee): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_EMPLOYEE}`, data)
    return res;
}