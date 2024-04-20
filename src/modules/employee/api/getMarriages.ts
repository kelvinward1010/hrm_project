import { BASE_URL, URL_MARRIAGE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { IBaseOtherItem } from "@/types";
import { useQuery } from "react-query";

export const getMarriages = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_MARRIAGE}`);
    return res.data;
}

type QueryFnType = typeof getMarriages;

type UseMarriagesOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useMarriages = ({ config }: UseMarriagesOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["marriage"],
        queryFn: () => getMarriages(),
    });
};