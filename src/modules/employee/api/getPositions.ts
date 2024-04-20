import { BASE_URL, URL_POSITION } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { IBaseOtherItem } from "@/types";
import { useQuery } from "react-query";

export const getPositions = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_POSITION}`);
    return res.data;
};

type QueryFnType = typeof getPositions;

type UsePositionsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const usePositions = ({ config }: UsePositionsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["position"],
        queryFn: () => getPositions(),
    });
};
