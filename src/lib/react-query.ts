import { DefaultOptions, QueryClient } from "react-query";



const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: 1,
    }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig});

