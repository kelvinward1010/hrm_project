import { atom } from "recoil";

export const isAddEmplyee = atom({
    key: "isAddEmplyee",
    default: true,
});

export const isEditEmplyee = atom({
    key: "isEditEmplyee",
    default: true,
});

export const isFilledEmployeeInfomation = atom({
    key: "isFilledEmployeeInfomation",
    default: false,
})

export const isFilledContractInfomation = atom({
    key: "isFilledContractInfomation",
    default: false,
})


export const deleteIdsDocuments = atom<string[]>({
    key: "deleteIdsDocuments",
    default: [],
})

export const deleteIdsContracts = atom<string[]>({
    key: "deleteIdsContracts",
    default: [],
})

export const checkDone = atom<boolean>({
    key: "checkDone",
    default: false,
})