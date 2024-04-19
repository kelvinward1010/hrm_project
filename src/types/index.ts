export interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

export type IBaseListItem<T> = {
    data: T[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export type IBaseOtherItem = {
    code: string;
    id: number;
    company_id: number;
    name: string;
    type?: number | string;
    value?: number | string;
    prefix?: string;
    benefits?: any[];
}

export type IBaseOption = {
    key?: string | number;
    value: string | number;
    label: string | number;
}

export interface Document {
    id?: number | string;
    employee_id?: number;
    document?: string;
    created_at?: string;
    updated_at?: string | null;
    documents?: any[];
}