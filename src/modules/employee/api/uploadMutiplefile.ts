import { BASE_URL, URL_SAVE_MUTIPLE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { AxiosRequestConfig } from "axios";
import { useMutation } from "react-query";

export const contractSaveMutiple = async (data: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `${BASE_URL}${URL_SAVE_MUTIPLE}`,
        data: data,
        headers: {
            accept: "application/json",
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await apiClient(config);
    return res;
}

type UseContractSaveMutipleOptions = {
    config?: MutationConfig<typeof contractSaveMutiple>;
};

export const useContractSaveMultiple = ({ config }: UseContractSaveMutipleOptions) => {
    return useMutation({
        onMutate: () => { },
        onError: () => { },
        onSuccess: () => { },
        ...config,
        mutationFn: contractSaveMutiple,
    });
};
