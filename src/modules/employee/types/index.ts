export interface IGetEmployees {
    page: number;
    search: string;
}

export interface IOptionsConfig{
    value: string | number;
    label: string,
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

export interface IEmployeeTable{
    key: any;
    staff_id: string;
    name: string;
    gender: string;
    mother_name: string;
    marriage_code: string;
    bank_account_no: string;
    bank_name: string;
    department_name: string;
    pob: string;
    ktp_no: string;
    mobile_no: string;
    tel_no: string;
    contract_start_date: string;
}

export interface ICreateEmployee {
    name: string;
    gender: number;
    mother_name: string;
    dob: string;
    pob: string;
    ktp_no: string;
    nc_id: string;
    home_address_1: string;
    home_address_2: string;
    mobile_no: string;
    tel_no: string;
    marriage_id: string;
    card_number: string;
    bank_account_no: string;
    bank_name: string;
    family_card_number: string;
    safety_insurance_no: string;
    health_insurance_no: string;
    contract_start_date: string;
    type: number;
    department_id: number;
    position_id: number;
    shift: string;
    basic_salary: number;
    audit_salary: number;
    safety_insurance: number;
    health_insurance: number;
    meal_allowance: number;
    grade_id: number;
    benefits: Array<any>;
    remark: string;
    account_user_id: any;
}

export interface IEditEmployee {
    name: string;
}