import { BASE_URL, URL_BENEFIT } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { IBaseOtherItem } from "@/types";
import { useQuery } from "react-query";

export const getBenefits = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_BENEFIT}`)
    return res.data;
}

type QueryFnType = typeof getBenefits;

type UseBenefitsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useBenefits = ({ config }: UseBenefitsOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["benefit"],
        queryFn: () => getBenefits(),
    });
};