import { IContracts, IDocuments } from "@/modules/employee/types"
import { IDocument, FieldData, IBaseOption, IBaseOtherItem, IContract } from "@/types"
import { extractDateT, extractFileNameFromUrl } from "./string"

export const handleMapContracts = (data: any[]) => {
    const dataMap: IContracts[] = data?.map((item: IContracts) => {
        return ({
            key: item?.id,
            id: item?.id,
            document_file: item?.document_file?.[0],
            contract_date: item?.contract_date,
            name: item?.name,
            document: item?.document,
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