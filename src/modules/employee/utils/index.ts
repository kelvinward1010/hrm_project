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

// export function validateFieldsEmployeeInfomation2(fields: any): boolean {
//     let isValid = true;
//     if (fields.name === ''
//         || fields.gender === ''
//         || fields.dob === ''
//         || fields.ktp_no === '') {
//             isValid = false;
//     }
//     return isValid;
// }