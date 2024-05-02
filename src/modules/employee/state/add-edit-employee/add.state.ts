import { selector } from "recoil";
import { checkDone, deleteIdsContracts, deleteIdsDocuments, isAddEmplyee, isEditEmplyee, isFilledContractInfomation, isFilledEmployeeInfomation } from "./add.atom";

export const addEmployeeState: any = selector({
    key: "addEmployeeState",
    get: ({ get }) => {
        const isAdd = get(isAddEmplyee);
        return isAdd;
    },
});

export const editEmployeeState: any = selector({
    key: "editEmployeeState",
    get: ({ get }) => {
        const isEdit = get(isEditEmplyee);
        return isEdit;
    },
});

export const filledEmployeeInfomation: any = selector({
    key: "filledEmployeeInfomation",
    get: ({ get }) => {
        const isFilledInfo = get(isFilledEmployeeInfomation);
        return isFilledInfo;
    },
});

export const filledContractInfomation: any = selector({
    key: "filledContractInfomation",
    get: ({ get }) => {
        const isFilledContractInfo = get(isFilledContractInfomation);
        return isFilledContractInfo;
    },
});


export const DataDeleteIdsDocuments: any = selector({
    key: "DataDeleteIdsDocuments",
    get: ({ get }) => {
        const data = get(deleteIdsDocuments);
        return data;
    },
});

export const DataDeleteIdsContracts: any = selector({
    key: "DataDeleteIdsContracts",
    get: ({ get }) => {
        const data = get(deleteIdsContracts);
        return data;
    },
});

export const CheckDoneFiles: any = selector({
    key: "CheckDoneFiles",
    get: ({ get }) => {
        const check = get(checkDone);
        return check;
    },
});