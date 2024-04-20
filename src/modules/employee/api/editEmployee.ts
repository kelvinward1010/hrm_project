import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEditEmployee } from "../types";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "react-query";

export const useEditEmployee = async (data: IEditEmployee, id: string): Promise<any> => {
    const res = await apiClient.put(`${BASE_URL}${URL_EMPLOYEE}/${id}`, data)
    return res;
}

export const editEmployee = async (data: IEditEmployee): Promise<any> => {
    const res = await apiClient.put(`${BASE_URL}${URL_EMPLOYEE}/${data?.id}`, data)
    return res?.data;
}

type UseEditEmployeeOptions = {
    config?: MutationConfig<typeof editEmployee>;
};

export const useEditEmployee1 = ({ config }: UseEditEmployeeOptions) => {
    return useMutation({
        onMutate: () => { },
        onError: () => { },
        onSuccess: () => { },
        ...config,
        mutationFn: editEmployee
    });
};