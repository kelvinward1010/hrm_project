import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEmployee } from "../types";

export const useCreateEmployee = async (data: IEmployee): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_EMPLOYEE}`, data)
    return res;
}