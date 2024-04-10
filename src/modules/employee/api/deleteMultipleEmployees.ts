import { BASE_URL, URL_DELETE_MULTIPLE_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IDeleteMultipleEmployees } from "../types";

export const useDeleteMultipleEmployees = async (data: IDeleteMultipleEmployees): Promise<any> => {
    const res = await apiClient.delete(`${BASE_URL}${URL_DELETE_MULTIPLE_EMPLOYEE}`)
    return res;
}