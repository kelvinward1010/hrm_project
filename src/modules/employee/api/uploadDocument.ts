import { BASE_URL, URL_UPLOAD_DOCUMENT } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { MutationConfig } from "@/lib/react-query";
import { AxiosRequestConfig } from "axios";
import { useMutation } from "react-query";

export const uploadEmployeeDocument = async (data: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: `${BASE_URL}${URL_UPLOAD_DOCUMENT}`,
        data: data,
        headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
        },
    };
    const res = await apiClient(config);
    return res;
};

type UseUploadFileOptions = {
    config?: MutationConfig<typeof uploadEmployeeDocument>;
};

export const useUploadDocuments = ({ config }: UseUploadFileOptions) => {
    return useMutation({
        onMutate: () => { },
        onError: () => { },
        onSuccess: () => { },
        ...config,
        mutationFn: uploadEmployeeDocument,
    });
};
