export interface IGetEmployees {
    page: number;
    search: string;
}

export interface IDeleteMultipleEmployees {
    record_ids: string[];
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

export interface IEmployee {
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
    contracts: any[];
    department_id: number;
    position_id: number;
    shift: string;
    hidden_on_payroll: number;
    basic_salary: number;
    audit_salary: number;
    safety_insurance: number;
    health_insurance: number;
    meal_allowance: number;
    grade_id: number;
    benefits: Array<any>;
    remark: string;
    account_user_id: any;
    documents: any[];
}

export interface IEditEmployee {
    name: string;
}

export interface IContracts{
    key?: string;
    id?: string;
    name: string;
    contract_date: string;
    document_file: any[];
}

export interface IDocuments{
    key?: string;
    id?: string;
    created_at: string;
    documents: any[];
    url?: any;
}