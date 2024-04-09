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
            marriage_id: Number(item.marriage_id),
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