import { IEmployee } from "@/types/employee"

export const handleMapEmployee = (data: any[]) => {
    const dataMap: IEmployee[] = data?.map((item: any) => {
        return({
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

export const getIdsItemsEmployee = (data: IEmployee[]) => {
    let listIds: string[] = [];
    data.forEach((item: IEmployee) => {
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
            } else {
                mappedObject[item.name] = item.value;
            }
        } else {
            mappedObject[item.name] = "";
        }
    });

    return mappedObject;
}

export function validateFields(fields: any[]): boolean {
    let isValid = true;
    fields.forEach((field) => {
        if (field.name === 'name' 
            || field.name === 'gender' 
            || field.name === 'dob' 
            || field.name === 'ktp_no'
            || field.name === 'nc_id'
            || field.name === 'contract_start_date'
            || field.name === 'type') {
            if (field.value === "") {
                isValid = false;
            }
        }
    });
    return isValid;
}
