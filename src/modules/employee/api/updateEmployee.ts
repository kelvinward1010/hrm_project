import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEditEmployee } from "../types";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

export const updateEmployee = async (data: IEditEmployee): Promise<any> => {
    const res = await apiClient.put(`${BASE_URL}${URL_EMPLOYEE}/${data?.id}`, data)
    return res?.data;
}

type UseUpdateEmployeeOptions = {
    config?: MutationConfig<typeof updateEmployee>;
};

export const useUpdateEmployee = ({ config }: UseUpdateEmployeeOptions) => {
    return useMutation({
        onMutate: () => { },
        onError: () => { },
        onSuccess: () => { },
        ...config,
        mutationFn: updateEmployee
    });
};