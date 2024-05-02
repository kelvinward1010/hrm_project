import { IEmployeeTable } from "../types";


export const handleMapEmployee = (data: any[]) => {
    const dataMap: IEmployeeTable[] = data?.map((item: any) => {
        return ({
            key: item.id,
            name: String(item.name),
            gender: item.gender == 0 ? 'Male' : item.gender ? 'Female' : "",
            mother_name: String(item.mother_name),
            bank_account_no: String(item.bank_account_no),
            bank_name: String(item.bank_name),
            marriage_code: String(item.marriage_code),
            contract_start_date: String(item.contract_start_date),
            department_name: String(item.department_name),
            pob: String(item.pob),
            ktp_no: String(item.ktp_no),
            mobile_no: String(item.mobile_no),
            tel_no: String(item.tel_no),
            staff_id: String(item.staff_id),
        })
    })

    return dataMap ?? []
}

export const getIdsItemsEmployee = (data: IEmployeeTable[]) => {
    let listIds: string[] = [];
    data.forEach((item: IEmployeeTable) => {
        listIds.push(item.key)
    })
    return listIds || [];
}


export function mapDataCreate1(data: any[]) {
    const mappedObject: Record<string, any> = {};

    data?.forEach((item) => {
        if (item.value !== undefined) {
            if (item.name === "contract_start_date") {
                const date = new Date(item.value);
                const formattedDate = date?.toISOString().split("T")[0];
                mappedObject[item.name] = formattedDate;
            } else if (item.name === "benefits") {
                if(item.value[0]?.key){
                    const it: any[] = [];
                    item?.value?.forEach((i: any) => {
                        it.push(i?.key)
                    })
                    mappedObject[item.name] = it;
                }else{
                    mappedObject[item.name] = item.value;
                }
            } else {
                mappedObject[item.name] = item.value;
            }
        } else {
            mappedObject[item.name] = "";
        }
    });

    return mappedObject;
}

export function mapDataCreate(data: any) {
    const { contract_start_date, benefits, ...rest } = data;
    const date = new Date(contract_start_date);
    const formattedDate = date?.toISOString().split("T")[0];
    const mappedObject: Record<string, any> = {};
    if(benefits[0]?.key){
        const it: any[] = [];
        benefits?.forEach((i: any) => {
            it.push(i?.key)
        })
        mappedObject['benefits'] = it;
    }else{
        mappedObject['benefits'] = benefits;
    }
    const dataTransform: any = {
        ...rest,
        contract_start_date: formattedDate,
        benefits: mappedObject['benefits'],
    }
    
    type EmployeeData = Record<any, any | string | null | undefined>;

    function checkValue(value: string | null | undefined): any {
        return value ?? "";
    }
    const transformedData: EmployeeData = {};
    for (const key in dataTransform) {
        transformedData[key] = checkValue(dataTransform[key]);
    }
    return transformedData;
};

export function transformValues(data: any) {
    const { hidden_on_payroll, entitle_ot, meal_allowance_paid, operational_allowance_paid, attendance_allowance_paid, ...rest } = data;
    const transformedData: any = {
        ...rest,
        hidden_on_payroll: hidden_on_payroll ? 1 : 0,
        entitle_ot: entitle_ot ? 1 : 0,
        meal_allowance_paid: meal_allowance_paid ? 1 : 0,
        operational_allowance_paid: operational_allowance_paid ? 1 : 0,
        attendance_allowance_paid: attendance_allowance_paid ? 1 : 0,
    };
    
    return transformedData;
}

export function validateFieldsEmployeeInfomation(fields: any): boolean {
    let isValid = true;
    if (fields.name === ''
        || fields.gender === ''
        || fields.dob === ''
        || fields.ktp_no === '') {
            isValid = false;
    }
    return isValid;
}

export function validateFieldsContractInfomation(fields: any): boolean {
    let isValid = true;
    if (fields.contract_start_date === '' || fields.name === 'type'){
        isValid = false;
    }
    return isValid;
}