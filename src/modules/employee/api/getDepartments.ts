import { BASE_URL, URL_DEPARTMENT } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { IBaseOtherItem } from "@/types";
import { useQuery } from "react-query";

export const getDepartments = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_DEPARTMENT}`)
    return res.data;
}

type QueryFnType = typeof getDepartments;

type UseDepartmentsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useDepartments = ({ config }: UseDepartmentsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["departments"],
        queryFn: () => getDepartments(),
    });
};