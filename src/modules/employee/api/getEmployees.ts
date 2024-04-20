import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEmployee, IGetEmployees } from "../types";
import { IBaseListItem } from "@/types";
import { AxiosRequestConfig } from "axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";

export const getEmployees = async (params: IGetEmployees): Promise<IBaseListItem<IEmployee>> => {
    const res = await apiClient.get(
        `${BASE_URL}${URL_EMPLOYEE}?page=${params?.page}&search=${params?.search}`,
    )
    return res.data;
}


type QueryFnType = typeof getEmployees;

type UseEmployeesOptions = {
    params: AxiosRequestConfig["params"];
    config?: QueryConfig<QueryFnType>;
};

export const useEmployees = ({ params, config }: UseEmployeesOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["employees", params],
        queryFn: () => getEmployees(params),
    });
};