import { BASE_URL, URL_EMPLOYEE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEmployee } from "../types";
import { FormRule } from "antd";

export const useCreateEmployee = async (data: IEmployee): Promise<any> => {
    const res = await apiClient.post(`${BASE_URL}${URL_EMPLOYEE}`, data)
    return res;
}


export const RULES_CREATE_EMPLOYEE: Record<keyof IEmployee, FormRule[]> ={
    name: [{required: true, message: 'Name is required!' }],
    gender: [{required: true, message: 'Gender is required!' }],
    mother_name: [],
    dob: [{required: true, message: 'Date of birth is required!' }],
    pob: [],
    ktp_no: [{required: true, message: 'KTP No is required!' }],
    nc_id: [],
    home_address_1: [],
    home_address_2: [],
    mobile_no: [],
    tel_no: [],
    marriage_id: [],
    card_number: [],
    bank_account_no: [],
    bank_name: [],
    family_card_number: [],
    safety_insurance_no: [],
    health_insurance_no: [],
    contract_start_date: [],
    type: [],
    contracts: [],
    department_id: [],
    position_id: [],
    shift: [],
    hidden_on_payroll: [],
    basic_salary: [],
    audit_salary: [],
    safety_insurance: [],
    health_insurance: [],
    meal_allowance: [],
    grade_id: [],
    benefits: [],
    remark: [],
    account_user_id: [],
    documents: []
} 