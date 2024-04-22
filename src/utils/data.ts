import { IContracts, IDocuments, IEmployeeTable } from "@/modules/employee/types"
import { IDocument, FieldData, IBaseOption, IBaseOtherItem, IContract } from "@/types"
import { extractDateT, extractFileNameFromUrl } from "./string"


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

export const handleMapContracts = (data: any[]) => {
    const dataMap: IContracts[] = data?.map((item: IContracts) => {
        return ({
            key: item.id,
            document_file: item.document_file,
            contract_date: item.contract_date,
            name: item.name,
        })
    })

    return dataMap ?? []
}

export const handleMapDocuments = (data: any[]) => {
    const dataMap: IDocuments[] = data?.map((item: any) => {
        return ({
            key: item.id,
            documents: item.documents?.[0] ? item.documents?.[0]?.name : extractFileNameFromUrl(item?.document),
            created_at: extractDateT(item.created_at),
            url: item?.document ? item?.document : '',
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


export function mapDataCreate(data: any[]) {
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

export function validateFieldsEmployeeInfomation(fields: any[]): boolean {
    let isValid = true;
    fields.forEach((field) => {
        if (field.name === 'name'
            || field.name === 'gender'
            || field.name === 'dob'
            || field.name === 'ktp_no') {
            if (field.value === "") {
                isValid = false;
            }
        }
    });
    return isValid;
}

export function validateFieldsContractInfomation(fields: any[]): boolean {
    let isValid = true;
    fields.forEach((field) => {
        if (field.name === 'contract_start_date'
            // || field.name === 'type'
        ) {
            if (field.value === "") {
                isValid = false;
            }
        }
    });
    return isValid;
}

export const configValuesSelect = (data: IBaseOtherItem[] | undefined) => {
    let dataFinal: IBaseOption[] = [];
    data?.forEach((field) => {
        dataFinal.push({
            key: field?.id,
            value: field?.id,
            label: field?.name
        })
    })
    return dataFinal ?? [];
}

export function transformValues(data: any[]) {
    return data?.map((item: any) => {
        if (['hidden_on_payroll', 'entitle_ot', 'meal_allowance_paid', 'operational_allowance_paid', 'attendance_allowance_paid'].includes(item.name)) {
            return { ...item, value: item.value === true ? 1 : item.value === false ? 0 : item.value };
        } else {
            return item;
        }
    });
}

export function filterDocuments(documents: any[]) {
    const take = documents?.filter((doc) => doc.documents && doc.documents[0]);
    const finaldata: any[] = [];
    take?.forEach((item) => {
        finaldata.push(item?.documents[0]);
    })
    return finaldata;
}

interface DataContracts {
    employee_id: string | number,
    names: string[],
    deleted_contracts: string[],
    contract_dates: string[],
    documents: any[],
    modified_contracts: string[],
}

export function filterContracts(documents: any[], id: string, deletes: string[]) {
    const take: any[] = documents?.filter((doc) => doc.document_file);
    const initialdata: DataContracts = {
        employee_id: id,
        names: [],
        deleted_contracts: deletes,
        contract_dates: [],
        documents: [],
        modified_contracts: [],
    }
    take?.forEach((item: any) => {
        initialdata.names.push(item?.name as string)
        initialdata.documents.push(item?.document_file)
        initialdata.contract_dates.push(item?.contract_date)
        initialdata.modified_contracts.push("");
    })
    return initialdata;
}

export function hasDocumentWithId(documents: IDocument[], id: number | string): boolean {
    const document = documents.find((doc) => doc.id === id);
    return !!document && !!document.document;
}

export function hasContractWithId(contracts: IContract[], id: number | string): boolean {
    const contract = contracts.find((cnt) => cnt.id === id);
    return !!contract && !!contract.created_at;
}

export function extractValues(data: any[], keys: string[]): Record<string, any> {
    const values: Record<string, FieldData> = {};
    for (const item of data) {
        if (keys.includes(item.name[0])) {
            values[item.name[0]] = item;
        }
    }
    return values;
}