import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { useQuery } from "react-query";

export const getDetailEmployee = async (id?: string): Promise<any> => {
    const res = await apiClient.get(`${BASE_URL}${URL_EMPLOYEE}/${id}`);
    return res;
}

type QueryFnType = typeof getDetailEmployee;

type UseEmployeeOptions = {
    id?: string;
    config?: QueryConfig<QueryFnType>;
};

export const useDetailEmployee = ({ id, config }: UseEmployeeOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["employee", id],
        queryFn: () => getDetailEmployee(id),
    });
};