export interface IUserInfo{
    id: any;
    username: string;
    email: string;
    level?: number;
    company_id: number;
    password?: string;
}

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

export type IResReceived = {
    message: string;
    result: boolean;
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

export interface IDocument {
    id?: number | string;
    employee_id?: number;
    document?: string;
    created_at?: string;
    updated_at?: string | null;
    documents?: any[];
}

export interface IContract {
    action?: string;
    id?: number | string;
    name?: string;
    employee_id?: number;
    document?: string;
    document_file?: any[];
    contract_date?: string;
    deleted_at: string | null;
    created_at?: string;
    updated_at?: string | null;
}