export interface IGetEmployees {
    page: number;
    search: string;
}

export interface IDeleteMultipleEmployees {
    record_ids: string[];
}