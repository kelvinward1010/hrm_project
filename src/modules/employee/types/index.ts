export interface IGetEmployees {
    page: number;
    search: string;
}

export interface IDeleteMultipleEmployees {
    record_ids: string[];
}

export interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

export interface ICreateEmployee {
    name: string;
}

export interface IEditEmployee {
    name: string;
}