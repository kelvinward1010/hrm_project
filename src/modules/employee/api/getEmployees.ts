import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEmployee, IGetEmployees } from "../types";
import { IBaseListItem } from "@/types";

export const useGetEmployees = async (data: IGetEmployees): Promise<IBaseListItem<IEmployee>> => {
    const res = await apiClient.get(`${BASE_URL}${URL_EMPLOYEE}?page=${data?.page}&search=${data?.search}`)
    return res.data;
}