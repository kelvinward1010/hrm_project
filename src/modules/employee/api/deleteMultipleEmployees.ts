import { BASE_URL, URL_DELETE_MULTIPLE_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IDeleteMultipleEmployees } from "../types";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";

export const deleteMultipleEmployees = async (data: IDeleteMultipleEmployees): Promise<any> => {
    const res = await apiClient.delete(`${BASE_URL}${URL_DELETE_MULTIPLE_EMPLOYEE}`, { data })
    return res;
}


type UsedeleteMultipleEmployeesOptions = {
    config?: MutationConfig<typeof deleteMultipleEmployees>;
};

export const useDeleteMultipleEmployees = ({ config }: UsedeleteMultipleEmployeesOptions = {}) => {
    return useMutation({
        onMutate: () => { },
        onError: () => { },
        onSuccess: () => {
            queryClient.invalidateQueries(['employees'])
        },
        ...config,
        mutationFn: deleteMultipleEmployees,
    });
};
