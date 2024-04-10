import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IGetEmployees } from "../types";

export const useGetEmployees = async (data: IGetEmployees): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_EMPLOYEE}?page=${data?.page}&search=${data?.search}`)
    return res;
}