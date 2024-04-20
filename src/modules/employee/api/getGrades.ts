import { BASE_URL, URL_GRADE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { IBaseOtherItem } from "@/types";
import { useQuery } from "react-query";

export const getGrades = async (): Promise<IBaseOtherItem[]> => {
    const res = await apiClient.get(`${BASE_URL}${URL_GRADE}`)
    return res.data;
}

type QueryFnType = typeof getGrades;

type UseGradesOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useGrades = ({ config }: UseGradesOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ["grade"],
        queryFn: () => getGrades(),
    });
};