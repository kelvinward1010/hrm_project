import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEditEmployee } from "../types";

export const useEditEmployee = async (data: IEditEmployee, id: string): Promise<any> => {
    const res = await apiClient.put(`${BASE_URL}${URL_EMPLOYEE}/${id}`, data)
    return res;
}